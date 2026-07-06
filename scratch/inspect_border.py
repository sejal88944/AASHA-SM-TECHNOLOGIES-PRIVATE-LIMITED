from PIL import Image

with Image.open("d:/SahyadriTech/Tech-Website/public/image.png") as img:
    width, height = img.size
    print(f"Dimensions: {width}x{height}")
    # Inspect top-left pixels
    print("Top-left pixel colors:")
    for y in range(10):
        row = [img.getpixel((x, y)) for x in range(10)]
        print(f"Row {y}: {row}")
