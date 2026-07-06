import Jimp from 'jimp';
import path from 'path';

const imagePath = path.join(process.cwd(), 'public', 'Sahyadri Tech Logo.png');

async function getColors() {
    try {
        const image = await Jimp.read(imagePath);
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const pixelCount = width * height;

        const colorMap = {};

        // Sample pixels (every 10th pixel to speed up)
        for (let x = 0; x < width; x += 10) {
            for (let y = 0; y < height; y += 10) {
                const hex = image.getPixelColor(x, y);
                const rgba = Jimp.intToRGBA(hex);
                // Ignore transparent or near-white/black pixels for theme extraction
                if (rgba.a < 255 || (rgba.r > 240 && rgba.g > 240 && rgba.b > 240) || (rgba.r < 15 && rgba.g < 15 && rgba.b < 15)) continue;

                const hexString = '#' + ((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b).toString(16).slice(1).toUpperCase();
                colorMap[hexString] = (colorMap[hexString] || 0) + 1;
            }
        }

        const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
        console.log('Dominant Colors:', sortedColors.slice(0, 5));

    } catch (err) {
        console.error(err);
    }
}

getColors();
