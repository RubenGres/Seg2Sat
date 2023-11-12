---
license: openrail
tags:
- stable-diffusion
- stable-diffusion-diffusers
- controlnet
inference: true
---

# Inference Endpoint for [Seg2Sat](https://huggingface.co/rgres/Seg2Sat-sd-controlnet) using [runwayml/stable-diffusion-v1-5](https://huggingface.co/stabilityai/stable-diffusion-2-1-base)

You can call the inference endpoint like this :

```
import base64
import requests

API_URL = "https://zqz606ggn85ysase.us-east-1.aws.endpoints.huggingface.cloud"

def encode_image(image_path):
  with open(image_path, "rb") as i:
    b64 = base64.b64encode(i.read())
  return b64.decode("utf-8")

prompt = "aerial view of jardin princier, Toulouse. Flowers, flowers, garden"
image = encode_image("handdrawn.png")


headers = {
	"Accept": "image/png",
	"Content-Type": "application/json"
}

# test the handler
def query(payload):
	response = requests.post(API_URL, headers=headers, json=payload)
	return response.content

payload = {
  "inputs": prompt,
  "prompt": prompt,
  "image": image,
  "steps": 20,
  "seed": 999
}

import json
with open('payload.json', 'w') as f:
    json.dump(payload, f)

image_bytes = query(payload)

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))

image.save("output.png")

```