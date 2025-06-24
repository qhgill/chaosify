from flask import Flask, request, send_file
from io import BytesIO
from PIL import Image
import time

app = Flask(__name__)

@app.route("/api/upload", methods=["POST"])
def uploadimg():
    if 'image' not in request.files:
        return {'error': 'No image file provided'}, 400
    image_file = request.files['image']
    image = Image.open(image_file.stream)
    img_io = BytesIO()
    image = image.convert("RGB")
    image.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == "__main__":
    app.run()