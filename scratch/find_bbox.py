from PIL import Image

with Image.open("d:/SahyadriTech/Tech-Website/public/image.png") as img:
    width, height = img.size
    print(f"Size: {width}x{height}")
    
    # Find bounding box of pixels that are not pure white (e.g. not (254, 254, 254) or (255, 255, 255))
    min_x, min_y = width, height
    max_x, max_y = -1, -1
    
    for y in range(height):
        for x in range(width):
            color = img.getpixel((x, y))
            # If not white/light grey
            if sum(color)/3 < 240:
                if x < min_x: min_x = x
                if y < min_y: min_y = y
                if x > max_x: max_x = x
                if y > max_y: max_y = y
                
    print(f"Bounding Box of non-white pixels: X from {min_x} to {max_x}, Y from {min_y} to {max_y}")
