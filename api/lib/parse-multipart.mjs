import { Readable } from 'node:stream'
import busboy from 'busboy'

/**
 * Buffer raw body (multipart uploads are capped elsewhere; allow headroom for text fields).
 * @param {import('http').IncomingMessage} req
 * @param {number} maxBytes
 */
async function bufferRequestBody(req, maxBytes) {
  const chunks = []
  let len = 0
  for await (const chunk of req) {
    len += chunk.length
    if (len > maxBytes) {
      req.destroy()
      throw new Error(`Request body exceeds ${maxBytes} bytes`)
    }
    chunks.push(chunk)
  }
  return Buffer.concat(chunks)
}

/**
 * Parse multipart/form-data into fields and optional single resume file.
 * Buffers the body first, then pipes into busboy — avoids stream issues with
 * Vite dev middleware and some serverless hosts where `req.pipe(busboy)` fails.
 * @param {import('http').IncomingMessage} req
 * @param {{ maxFileBytes: number }} opts
 * @returns {Promise<{ fields: Record<string, string | string[]>; files: Array<{ fieldname: string; buffer: Buffer; mime: string; originalname: string }> }>}
 */
export async function parseMultipartForm(req, opts) {
  const ct = req.headers['content-type']
  if (!ct || !String(ct).toLowerCase().includes('multipart/form-data')) {
    throw new Error(`Expected multipart/form-data; received: ${ct ? String(ct).slice(0, 80) : '(no Content-Type)'}`)
  }

  const maxBody = opts.maxFileBytes + 768 * 1024
  const body = await bufferRequestBody(req, maxBody)
  if (!body.length) {
    throw new Error('Empty request body')
  }

  const headers = { ...req.headers, 'content-type': ct, 'content-length': String(body.length) }
  delete headers['transfer-encoding']

  return new Promise((resolve, reject) => {
    const fields = {}
    const files = []

    try {
      const bb = busboy({
        headers,
        limits: { fileSize: opts.maxFileBytes, files: 1 },
        defParamCharset: 'utf8',
      })

      bb.on('field', (name, val) => {
        if (Object.prototype.hasOwnProperty.call(fields, name)) {
          const cur = fields[name]
          if (Array.isArray(cur)) fields[name] = [...cur, val]
          else fields[name] = [cur, val]
        } else {
          fields[name] = val
        }
      })

      bb.on('file', (fieldname, file, info) => {
        const chunks = []
        let total = 0
        let truncated = false
        file.on('data', (d) => {
          total += d.length
          if (total > opts.maxFileBytes) {
            truncated = true
            file.resume()
            return
          }
          chunks.push(d)
        })
        file.on('limit', () => {
          truncated = true
        })
        file.on('end', () => {
          if (!truncated && chunks.length) {
            files.push({
              fieldname,
              buffer: Buffer.concat(chunks),
              mime: info.mimeType || 'application/octet-stream',
              originalname: info.filename || 'resume',
            })
          }
        })
      })

      bb.on('error', (err) => reject(err))
      bb.on('finish', () => resolve({ fields, files }))

      const src = Readable.from(body)
      src.on('error', reject)
      src.pipe(bb)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * @param {Record<string, string | string[]>} fields
 * @param {string} name
 */
export function fieldFirst(fields, name) {
  const v = fields[name]
  if (Array.isArray(v)) return v[0] || ''
  return v || ''
}

/**
 * @param {Record<string, string | string[]>} fields
 * @param {string} name
 */
export function fieldAll(fields, name) {
  const v = fields[name]
  if (!v) return []
  return Array.isArray(v) ? v : [v]
}
