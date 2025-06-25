from flask import Flask, request, send_file
from io import BytesIO
from PIL import Image, ImageEnhance
import numpy

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

@app.route("/api/chaosify", methods=["POST"])
def chaosify():
    if 'image' not in request.files:
        return {'error': 'No image file provided'}, 400
    image_file = request.files['image']
    image = Image.open(image_file.stream).convert("RGB")
    numpy_image = numpy.array(image)
    noise = numpy.random.normal(0, 80, numpy_image.shape).astype(numpy.int16)
    chaosified_image = numpy.clip(numpy_image + noise, 0, 255).astype(numpy.uint8)
    image = Image.fromarray(chaosified_image)
    image = ImageEnhance.Color(image).enhance(0.6)
    image = ImageEnhance.Sharpness(image).enhance(0.1)
    image = ImageEnhance.Contrast(image).enhance(1.2)
    image = ImageEnhance.Brightness(image).enhance(0.7)
    image = ImageEnhance.Contrast(image).enhance(1.9)
    
    img_io = BytesIO()
    image.save(img_io, 'JPEG', quality=8)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')


if __name__ == "__main__":
    app.run()