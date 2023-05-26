from PIL import Image
from io import BytesIO
import base64
import gradio as gr

def generate_map(image, prompt, steps, seed):
    return image

with gr.Blocks() as demo:
    button = gr.Button(label="Generate Image")
    button.click(fn=generate_map, inputs=[gr.Image(), gr.Textbox(), gr.Number(), gr.Number()], outputs=gr.Image())
demo.launch()
