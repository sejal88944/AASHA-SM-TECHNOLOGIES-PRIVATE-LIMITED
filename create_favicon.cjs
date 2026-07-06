const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(process.cwd(), 'public', 'Sahyadri Tech Logo.png');
const outputPath = path.join(process.cwd(), 'public', 'favicon.png');

async function createFavicon() {
    try {
        const metadata = await sharp(inputPath).metadata();
        const height = metadata.height;

        // Assume the icon is square-ish on the left side.
        // We crop a square of size height x height from the left.
        // If width is less than height, we just resize.

        let transform = sharp(inputPath);

        if (metadata.width > height) {
            transform = transform.extract({ left: 0, top: 0, width: height, height: height });
        }

        // Resize to smaller icon (e.g., 40x40) and place on 64x64 canvas
        // This adds transparent padding around it, making it look smaller.
        const iconSize = 40; // Reduced from full 64 to 40
        const canvasSize = 64;
        const padding = Math.floor((canvasSize - iconSize) / 2);

        await transform
            .resize(iconSize, iconSize)
            .extend({
                top: padding,
                bottom: padding,
                left: padding,
                right: padding,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .toFile(outputPath);

        console.log("Favicon created successfully");
    } catch (error) {
        console.error("Error creating favicon:", error);
    }
}

createFavicon();
