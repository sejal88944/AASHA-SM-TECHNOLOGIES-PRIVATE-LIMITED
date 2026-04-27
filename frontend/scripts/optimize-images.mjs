/**
 * One-off / CI: compress raster assets in public/.
 * Run: npm run optimize:images  (requires devDependency `sharp`)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')

async function main() {
  const logoPath = join(pub, 'logo.jpeg')
  const input = readFileSync(logoPath)

  const webpBuf = await sharp(input)
    .resize(1024, null, { withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toBuffer()

  const jpegBuf = await sharp(input)
    .resize(1024, null, { withoutEnlargement: true })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer()

  writeFileSync(join(pub, 'logo.webp'), webpBuf)
  writeFileSync(logoPath, jpegBuf)

  const favPath = join(pub, 'favicon.jpg')
  const favIn = readFileSync(favPath)
  const favBuf = await sharp(favIn)
    .resize(192, 192, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
  writeFileSync(favPath, favBuf)

  console.log('Wrote public/logo.webp and optimized public/logo.jpeg, public/favicon.jpg')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
