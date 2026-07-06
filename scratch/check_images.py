from PIL import Image

def analyze_img(path):
    try:
        with Image.open(path) as img:
            print(f"Path: {path}")
            print(f"Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
            # Check if transparent
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                print("Has transparency channel.")
            else:
                print("No transparency channel.")
    except Exception as e:
        print(f"Error reading {path}: {e}")

analyze_img("d:/SahyadriTech/Tech-Website/public/image.png")
analyze_img("d:/SahyadriTech/Tech-Website/public/image copy.png")
