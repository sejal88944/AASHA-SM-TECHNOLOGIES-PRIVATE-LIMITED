/**
 * Build the same shape as `parseMultipartForm` from a Web `FormData` instance.
 * @param {FormData} formData
 * @param {number} maxFileBytes
 */
export async function parsedFromWebFormData(formData, maxFileBytes) {
  /** @type {Record<string, string | string[]>} */
  const fields = {}

  for (const [key, value] of formData.entries()) {
    if (typeof value !== 'string') continue
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const cur = fields[key]
      if (Array.isArray(cur)) fields[key] = [...cur, value]
      else fields[key] = [cur, value]
    } else {
      fields[key] = value
    }
  }

  const files = []
  const resume = formData.get('resume')
  if (resume && typeof resume !== 'string') {
    const size = typeof resume.size === 'number' ? resume.size : 0
    if (size > maxFileBytes) {
      throw new Error(`Request body exceeds ${maxFileBytes} bytes`)
    }
    if (size > 0) {
      const buf = Buffer.from(await resume.arrayBuffer())
      if (buf.length) {
        files.push({
          fieldname: 'resume',
          buffer: buf,
          mime: resume.type || 'application/octet-stream',
          originalname: resume.name || 'resume',
        })
      }
    }
  }

  return { fields, files }
}
