const { Jimp } = require('jimp');
const path = require('path');

const imagePath = path.join(process.cwd(), 'public', 'Sahyadri Tech Logo.png');

async function getColors() {
    try {
        const image = await Jimp.read(imagePath);
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        const colorMap = {};

        // Sample pixels (every 5th pixel)
        for (let x = 0; x < width; x += 5) {
            for (let y = 0; y < height; y += 5) {
                const hex = image.getPixelColor(x, y);
                const rgba = Jimp.intToRGBA(hex);

                // Filter out transparent and extremely light/dark pixels
                if (rgba.a < 255) continue;
                if (rgba.r > 240 && rgba.g > 240 && rgba.b > 240) continue;
                if (rgba.r < 20 && rgba.g < 20 && rgba.b < 20) continue;

                const hexString = '#' + ((1 << 24) + (rgba.r << 16) + (rgba.g << 8) + rgba.b).toString(16).slice(1).toUpperCase();
                colorMap[hexString] = (colorMap[hexString] || 0) + 1;
            }
        }

        const sortedColors = Object.entries(colorMap).sort((a, b) => b[1] - a[1]);
        console.log('Dominant Colors:', sortedColors.slice(0, 5));

    } catch (err) {
        // Fallback for different jimp structure
        try {
            const _Jimp = require('jimp');
            const img = await _Jimp.read(imagePath);
            // ... same logic
            console.log("Used fallback require");
        } catch (e) {
            console.error("Both attempts failed", err, e);
        }
    }
}

getColors();
