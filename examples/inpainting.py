from diffusers import StableDiffusionControlNetInpaintPipeline, ControlNetModel, UniPCMultistepScheduler
from diffusers.utils import load_image
import torch
import cv2
from PIL import Image

device = "cuda:0" if torch.cuda.is_available() else "cpu"

controlnet = ControlNetModel.from_pretrained("rgres/sd-controlnet-aerialdreams", torch_dtype=torch.float16).to(device)

pipe_sd = StableDiffusionControlNetInpaintPipeline.from_pretrained(
    "stabilityai/stable-diffusion-2-inpainting",
    revision="fp16",
    controlnet=controlnet,
    torch_dtype=torch.float16,
)

pipe_sd.scheduler = UniPCMultistepScheduler.from_config(pipe_sd.scheduler.config)
pipe_sd.to(device)

seg_url = "https://raw.githubusercontent.com/RubenGres/Seg2Sat/main/examples/segmentation.png"
segmentation = load_image(seg_url)

mask_url = "https://raw.githubusercontent.com/RubenGres/Seg2Sat/main/examples/mask.png"
mask_image = load_image(mask_url)

image_url = "https://raw.githubusercontent.com/RubenGres/Seg2Sat/main/examples/base_sat.jpg"
image = load_image(image_url)

# generate image
generator = torch.manual_seed(0)
new_image = pipe_sd(
    "Aerial view",
    num_inference_steps=20,
    generator=generator,
    image=image,
    control_image=segmentation,
    controlnet_conditioning_scale = 0.5,
    mask_image=mask_image
).images[0]

new_image