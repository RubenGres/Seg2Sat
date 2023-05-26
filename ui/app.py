import os
from flask import Flask, request
import requests
from gradio_client import Client
import base64


base_gradio_url = os.getenv('URL_GRADIO')
client = None

app = Flask(__name__, static_url_path='/static')

@app.route('/')
def index():
    return app.send_static_file('index.html')

def save_base64_image(base64Image):
    image_data = base64.b64decode(base64Image)
    path = "input_image.jpg"
    with open(path, 'wb') as f:
        f.write(image_data)
    return path

def encode_image_to_base64(filepath):
    with open(filepath, "rb") as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_image

@app.route('/predict', methods=['POST'])
def predict():
    global client
    if not client:
      client = Client(base_gradio_url)
    
    data = request.get_json()
    
    base64Image = data['data'][0]
    prompt = data['data'][1]
    steps = data['data'][2]
    seed = data['data'][3]

    b64meta, b64_data = base64Image.split(',')

    image_path = save_base64_image(b64_data)

    result = client.predict(
        image_path, prompt, steps, seed, fn_index=0
    )

    return b64meta + ',' + encode_image_to_base64(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0',  port=int(
        os.environ.get('PORT', 8000)), debug=True)
