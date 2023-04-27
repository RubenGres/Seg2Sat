AerialDreams
======

This project aims to generate fake aerial images from image segmentation using [StableDiffusion](https://github.com/CompVis/stable-diffusion), [ControlNet](https://github.com/lllyasviel/ControlNet) and IGN's [FLAIR (French Land cover from Aerospace ImageRy)  dataset](https://ignf.github.io/FLAIR/).

Ground Truth               |  Image Segmentation      |  Generated Image
:-------------------------:|:------------------------:|:-------------------------:
![](images/img_ex.png)     |  ![](images/msk_ex.png)  |  **TODO**

<!---
## How to use

You can play with the model on the dedicated HuggingFace space or run it locally.


## About the dataset

I had create a new dataset from FLAIR to be useable with stable diffusion. I first converted all .TIF images to .PNG to have a more manageable file format with StableDiffusion. A LUT from the dataset documentation has also been applied to the image segmentation.  

Location information and description was gathered from the TIF files and from the OpenStreetMap API. From this a label was created for each image.

The entire dataset (> 61k images) can be found on HuggingFace.

## Download the model

The trained model is now available on HuggingFace or Civit.ai

--->

## Limitations

This dataset covers France only, this will introduce a biais in the learned representation and it the model might struggle to render other types of terrain.
