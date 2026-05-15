import { ObjectId } from 'mongodb'
import { getApplicationsCollection } from './mongo-shared.mjs'
import {
  isAllowedResumeMime,
  isReasonablePhone,
  isValidEmail,
  MAX_RESUME_BYTES,
  normalizeStatus,
  normalizeTechnicalSkills,
  sanitizeShort,
  sanitizeText,
} from './sanitize.mjs'
import { assertHiringAdmin } from './auth-admin.mjs'
import {
  adminNotificationHtml,
  candidateConfirmationHtml,
  createMailerAsync,
  sendMailSafe,
} from './email-hiring.mjs'
import { clientIpFromReq, rateLimitConsume } from './rate-limit-ip.mjs'
import { fieldAll, fieldFirst } from './parse-multipart.mjs'
import { mongoErrorToClientMessage, stripUndefined } from './mongo-utils.mjs'

const EMPLOYMENT_TYPES = ['Internship', 'Full-time']

/**
 * @typedef {{ fields: Record<string, string | string[]>; files: Array<{ buffer: Buffer; mime: string; originalname: string }> }} ParsedMultipart
 */

/**
 * @param {ParsedMultipart} parsed
 * @param {NodeJS.ProcessEnv} env
 * @param {{ ip?: string; origin?: string }} meta
 */
export async function submitApplicationFromMultipart(parsed, env, meta = {}) {
  const fields = parsed.fields || {}
  const honeypot = sanitizeShort(fieldFirst(fields, 'website'), 80)
  if (honeypot) {
    return { status: 200, json: { ok: true } }
  }

  const ip = meta.ip || 'unknown'
  const rl = rateLimitConsume(`apply:${ip}`, { windowMs: 15 * 60 * 1000, max: 12 })
  if (!rl.ok) {
    return { status: 429, json: { ok: false, error: `Too many applications. Try again in ${rl.retryAfterSec}s.` } }
  }

  const fullName = sanitizeShort(fieldFirst(fields, 'fullName'), 120)
  const email = sanitizeShort(fieldFirst(fields, 'email'), 120).toLowerCase()
  const phone = sanitizeShort(fieldFirst(fields, 'phone'), 40)
  const city = sanitizeShort(fieldFirst(fields, 'city'), 120)
  const position = sanitizeShort(fieldFirst(fields, 'position'), 200)
  const employmentType = sanitizeShort(fieldFirst(fields, 'employmentType'), 40)
  const skills = sanitizeText(fieldFirst(fields, 'skills'), 2000)
  const experienceLevel = sanitizeShort(fieldFirst(fields, 'experienceLevel'), 80)
  const college = sanitizeShort(fieldFirst(fields, 'college'), 200)
  const linkedIn = sanitizeShort(fieldFirst(fields, 'linkedIn'), 300)
  const github = sanitizeShort(fieldFirst(fields, 'github'), 300)
  const portfolio = sanitizeShort(fieldFirst(fields, 'portfolio'), 300)
  const motivation = sanitizeText(fieldFirst(fields, 'motivation'), 5000)
  const pagePath = sanitizeShort(fieldFirst(fields, 'pagePath'), 200)

  const techRaw = fieldAll(fields, 'technicalSkills')
  const technicalSkills = normalizeTechnicalSkills(techRaw)

  if (!fullName || !email || !phone || !city || !position || !employmentType || !skills || !experienceLevel || !motivation) {
    return { status: 400, json: { ok: false, error: 'Please complete all required fields.' } }
  }
  if (!isValidEmail(email)) {
    return { status: 400, json: { ok: false, error: 'Invalid email address.' } }
  }
  if (!isReasonablePhone(phone)) {
    return { status: 400, json: { ok: false, error: 'Enter a valid mobile number (10–15 digits).' } }
  }
  if (!EMPLOYMENT_TYPES.includes(employmentType)) {
    return { status: 400, json: { ok: false, error: 'Invalid employment type.' } }
  }

  let resumeFile = parsed.files?.[0] || null
  if (resumeFile) {
    if (resumeFile.buffer.length > MAX_RESUME_BYTES) {
      return { status: 400, json: { ok: false, error: 'Resume must be 2MB or smaller.' } }
    }
    if (!isAllowedResumeMime(resumeFile.mime)) {
      return { status: 400, json: { ok: false, error: 'Resume must be PDF or Word (.doc / .docx).' } }
    }
  }

  const doc = {
    fullName,
    email,
    phone,
    city,
    position,
    employmentType,
    skills,
    experienceLevel,
    college,
    technicalSkills,
    linkedIn,
    github,
    portfolio,
    motivation,
    pagePath: pagePath || '',
    resumeFileName: resumeFile ? sanitizeShort(resumeFile.originalname, 200) : null,
    resumeMime: resumeFile ? resumeFile.mime : null,
    resumeSize: resumeFile ? resumeFile.buffer.length : 0,
    resumeData: resumeFile ? resumeFile.buffer : null,
    applicationDate: new Date(),
    status: 'New',
    source: 'careers_apply',
    updatedAt: new Date(),
    metaIp: sanitizeShort(ip, 80),
  }

  try {
    const coll = await getApplicationsCollection(env)
    const result = await coll.insertOne(stripUndefined(doc))
    const id = result.insertedId.toString()

    const origin = (meta.origin || env.VITE_SITE_URL || env.SITE_URL || 'https://smtechsolutions.in').replace(/\/$/, '')
    const fromName = env.EMAIL_FROM_NAME?.trim() || 'AASHA-SM Technologies Hiring'
    const fromAddr = env.EMAIL_USER?.trim()
    const adminTo = env.ADMIN_NOTIFY_EMAIL?.trim() || fromAddr

    try {
      const transporter = await createMailerAsync(env)
      if (transporter && fromAddr) {
        await sendMailSafe(transporter, {
          from: `"${fromName}" <${fromAddr}>`,
          to: email,
          subject: `We received your application — ${position}`,
          text: `Hi ${fullName},\n\nThanks for applying. We will review your profile for ${position}.\n\n— AASHA-SM Technologies`,
          html: candidateConfirmationHtml({ fullName, position }),
        })

        if (adminTo) {
          await sendMailSafe(transporter, {
            from: `"${fromName}" <${fromAddr}>`,
            to: adminTo,
            subject: `New application: ${position} — ${fullName}`,
            text: `New applicant ${fullName} (${email}) for ${position}. ID: ${id}`,
            html: adminNotificationHtml({ ...doc, _id: id }, origin),
          })
        }
      }
    } catch (e) {
      console.error('[apply] email notify', e?.message || e)
    }

    return { status: 200, json: { ok: true, id, message: 'Application submitted successfully.' } }
  } catch (e) {
    console.error('[apply] insert failed', e instanceof Error ? e.message : e)
    console.error('[apply] insert stack', e instanceof Error ? e.stack : '')
    const clientMsg = mongoErrorToClientMessage(e)
    return {
      status: 500,
      json: {
        ok: false,
        success: false,
        error: clientMsg,
        message: 'Application submission failed',
        code: 'INSERT_FAILED',
      },
    }
  }
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {NodeJS.ProcessEnv} env
 * @param {URLSearchParams} searchParams
 */
export async function listApplications(req, env, searchParams) {
  assertHiringAdmin(env, req)
  const q = sanitizeShort(searchParams.get('q') || '', 120)
  const position = sanitizeShort(searchParams.get('position') || '', 200)
  const skill = sanitizeShort(searchParams.get('skill') || '', 80)
  const status = normalizeStatus(searchParams.get('status') || '')
  const limit = Math.min(100, Math.max(1, Number(searchParams.get('limit') || 40)))
  const skip = Math.max(0, Number(searchParams.get('skip') || 0))

  /** @type {import('mongodb').Filter<import('mongodb').Document>} */
  const filter = {}
  if (status) filter.status = status
  if (position) filter.position = new RegExp(position.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
  if (skill) {
    const esc = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    filter.technicalSkills = new RegExp(esc, 'i')
  }
  if (q) {
    filter.$or = [
      { fullName: new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
      { email: new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
      { position: new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') },
    ]
  }

  const coll = await getApplicationsCollection(env)
  const [items, total] = await Promise.all([
    coll
      .find(filter, {
        projection: {
          resumeData: 0,
        },
        sort: { applicationDate: -1 },
        skip,
        limit,
      })
      .toArray(),
    coll.countDocuments(filter),
  ])

  const safe = items.map((d) => ({
    id: d._id.toString(),
    ...serializeAppDoc(d),
  }))
  return { status: 200, json: { ok: true, items: safe, total, limit, skip } }
}

/**
 * @param {import('mongodb').WithId<import('mongodb').Document>} d
 */
function serializeAppDoc(d) {
  return {
    fullName: d.fullName,
    email: d.email,
    phone: d.phone,
    city: d.city,
    position: d.position,
    employmentType: d.employmentType,
    skills: d.skills,
    experienceLevel: d.experienceLevel,
    college: d.college,
    technicalSkills: d.technicalSkills,
    linkedIn: d.linkedIn,
    github: d.github,
    portfolio: d.portfolio,
    motivation: d.motivation,
    pagePath: d.pagePath,
    resumeFileName: d.resumeFileName,
    resumeMime: d.resumeMime,
    resumeSize: d.resumeSize,
    applicationDate: d.applicationDate,
    status: d.status,
    source: d.source,
    updatedAt: d.updatedAt,
  }
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {NodeJS.ProcessEnv} env
 * @param {string} id
 */
export async function getApplicationById(req, env, id) {
  assertHiringAdmin(env, req)
  let oid
  try {
    oid = new ObjectId(id)
  } catch {
    return { status: 400, json: { ok: false, error: 'Invalid id' } }
  }
  const coll = await getApplicationsCollection(env)
  const doc = await coll.findOne(
    { _id: oid },
    {
      projection: { resumeData: 0 },
    },
  )
  if (!doc) return { status: 404, json: { ok: false, error: 'Not found' } }
  return { status: 200, json: { ok: true, item: { id: doc._id.toString(), ...serializeAppDoc(doc) } } }
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {NodeJS.ProcessEnv} env
 * @param {string} id
 */
export async function getApplicationResume(req, env, id) {
  assertHiringAdmin(env, req)
  let oid
  try {
    oid = new ObjectId(id)
  } catch {
    return { status: 400, json: { ok: false, error: 'Invalid id' }, binary: null, headers: {} }
  }
  const coll = await getApplicationsCollection(env)
  const doc = await coll.findOne({ _id: oid }, { projection: { resumeData: 1, resumeMime: 1, resumeFileName: 1 } })
  const resumeBuffer = doc ? resumeDataToBuffer(doc.resumeData) : null
  if (!doc || !resumeBuffer) {
    return { status: 404, json: { ok: false, error: 'No resume on file' }, binary: null, headers: {} }
  }
  const name = sanitizeShort(doc.resumeFileName || 'resume', 200) || 'resume'
  return {
    status: 200,
    json: null,
    binary: resumeBuffer,
    headers: {
      'Content-Type': doc.resumeMime || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${name.replace(/"/g, '')}"`,
    },
  }
}

/**
 * MongoDB stores Node Buffers as BSON Binary by default and reads them back as
 * Binary objects unless promoteBuffers is enabled. Download handlers expect a
 * Buffer, so normalize the common binary representations in one place.
 * @param {unknown} value
 * @returns {Buffer | null}
 */
export function resumeDataToBuffer(value) {
  if (!value) return null
  if (Buffer.isBuffer(value)) return value
  if (value instanceof Uint8Array) return Buffer.from(value)

  if (typeof value === 'object') {
    const binaryLike = /** @type {{ value?: () => unknown; buffer?: unknown }} */ (value)
    if (typeof binaryLike.value === 'function') {
      const resolved = binaryLike.value()
      if (Buffer.isBuffer(resolved)) return resolved
      if (resolved instanceof Uint8Array) return Buffer.from(resolved)
    }
    if (Buffer.isBuffer(binaryLike.buffer)) return binaryLike.buffer
    if (binaryLike.buffer instanceof Uint8Array) return Buffer.from(binaryLike.buffer)
  }

  return null
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {NodeJS.ProcessEnv} env
 * @param {string} id
 * @param {unknown} body
 */
export async function patchApplicationStatus(req, env, id, body) {
  assertHiringAdmin(env, req)
  const next = typeof body === 'object' && body && 'status' in body ? normalizeStatus(body.status) : null
  if (!next) {
    return { status: 400, json: { ok: false, error: 'Invalid status' } }
  }
  let oid
  try {
    oid = new ObjectId(id)
  } catch {
    return { status: 400, json: { ok: false, error: 'Invalid id' } }
  }
  const coll = await getApplicationsCollection(env)
  const r = await coll.updateOne({ _id: oid }, { $set: { status: next, updatedAt: new Date() } })
  if (!r.matchedCount) return { status: 404, json: { ok: false, error: 'Not found' } }
  return { status: 200, json: { ok: true, status: next } }
}

export { clientIpFromReq }
