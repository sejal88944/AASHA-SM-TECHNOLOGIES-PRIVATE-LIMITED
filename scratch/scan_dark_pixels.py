from PIL import Image

with Image.open("d:/SahyadriTech/Tech-Website/public/image.png") as img:
    width, height = img.size
    print(f"Size: {width}x{height}")
    # Let's check for any pixel that is dark (e.g. R < 100, G < 100, B < 100) near the borders
    # Let's scan a box at x=15 to see if there is a vertical border
    for y in range(height):
        # Scan along x
        row_colors = [img.getpixel((x, y)) for x in range(30)]
        # find dark pixel index
        dark_indices = [i for i, c in enumerate(row_colors) if sum(c)/3 < 150]
        if dark_indices:
            print(f"Y={y}: dark pixels found at X indices: {dark_indices} with colors {[row_colors[i] for i in dark_indices]}")
            break
