from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
from typing import  Dict, List, Any
from io import BytesIO
from PIL import Image
import base64
import torch

# set device
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
if device.type != 'cuda':
    raise ValueError("need to run on GPU")
# set mixed precision dtype
dtype = torch.bfloat16 if torch.cuda.get_device_capability()[0] == 8 else torch.float16


class EndpointHandler():
    def __init__(self, path=""):
        self.stable_diffusion_id = "stabilityai/stable-diffusion-2-1-base"

        controlnet = ControlNetModel.from_pretrained("rgres/Seg2Sat-sd-controlnet", torch_dtype=torch.float16)

        self.pipe = StableDiffusionControlNetPipeline.from_pretrained(
            self.stable_diffusion_id, controlnet=controlnet, torch_dtype=dtype, safety_checker=None
        ).to(device)

    def __call__(self, data: Any) -> List[List[Dict[str, float]]]:
        """
        :param data: A dictionary contains `inputs` and optional `image` field.
        :return: A dictionary with `image` field contains image in base64.
        """
        prompt = data.pop("prompt", None)
        image = data.pop("image", None)
        steps = data.pop("steps", 30)
        seed = data.pop("seed", None)
        
        # Check if neither prompt nor image is provided
        if prompt is None and image is None:
            return {"error": "Please provide a prompt and base64 encoded image."}
                
        # decode image
        image = self.decode_base64_image(image)

        self.generator = torch.Generator(device="cpu").manual_seed(seed)
        
        # run inference pipeline
        image_out = self.pipe(
            prompt=prompt, 
            image=image,
            num_inference_steps=steps, 
            generator=self.generator
        ).images[0]
        
        # return first generate PIL image
        return image_out

    
    # helper to decode input image
    def decode_base64_image(self, image_string):
        base64_image = base64.b64decode(image_string)
        buffer = BytesIO(base64_image)
        image = Image.open(buffer)
        return image
