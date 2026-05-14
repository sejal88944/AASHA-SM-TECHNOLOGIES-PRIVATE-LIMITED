import busboy from 'busboy'

/**
 * Parse multipart/form-data into fields and optional single resume file.
 * @param {import('http').IncomingMessage} req
 * @param {{ maxFileBytes: number }} opts
 * @returns {Promise<{ fields: Record<string, string>; files: Array<{ fieldname: string; buffer: Buffer; mime: string; originalname: string }> }>}
 */
export function parseMultipartForm(req, opts) {
  return new Promise((resolve, reject) => {
    const fields = {}
    const files = []

    try {
      const bb = busboy({
        headers: req.headers,
        limits: { fileSize: opts.maxFileBytes, files: 1 },
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
      req.pipe(bb)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * Normalize multi-value fields from busboy (string | string[])
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
