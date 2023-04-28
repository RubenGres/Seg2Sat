AerialDreams
======

## Description

AerialDreams is a project that explores the potential of utilizing algorithms such as [StableDiffusion](https://github.com/CompVis/stable-diffusion) and [ControlNet](https://github.com/lllyasviel/ControlNet) to generate aerial images based on image segmentation data. By leveraging IGN's [FLAIR (French Land cover from Aerospace ImageRy)](https://ignf.github.io/FLAIR/) dataset, which provides land cover information for various regions in France, this project aims to create visually appealing synthetic aerial photographs that resemble real aerial imagery.

Ground Truth               |  Image Segmentation      |  Generated Image
:-------------------------:|:------------------------:|:-------------------------:
![](images/img_ex.png)     |  ![](images/msk_ex.png)  |  **TODO**


<br>

<!---
## How to use

You can play with the model on the dedicated HuggingFace space or run it locally.

## Download the model

The trained model is available on HuggingFace

--->

## About the dataset

To facilitate the use of StableDiffusion, a custom dataset has been derived from the FLAIR dataset. The TIFF images have been converted to PNG format for convenience, and the image segmentation process incorporates the recommended Look-Up Table (LUT) from the dataset documentation. Location data and descriptions have been gathered from the TIF files and the OpenStreetMap API to enrich the dataset, enabling the creation of meaningful labels for each image.

The complete dataset, consisting of over 61,000 images, can be accessed on HuggingFace [here](https://huggingface.co/datasets/rgres/AerialDreams).

<br>

## File Structure

The project consists of the following files and directories:

- validation/: A directory containing validation data and prompts.
- scripts/get_classes_percentages.py: A Python script for calculating the percentages of different classes for each segmentation image.
- scripts/get_image_segmentation.py: A Python script to convert TIFF image segmentation to PNG format.
- scripts/get_metadata.py: A Python script for extracting metadata from the FLAIR dataset and OpenStreetMap API.

<br>

## Limitations

One limitation of this project is that the FLAIR dataset covers France only. As a result, the learned representation and generated images may be biased towards French terrain. The model might struggle to accurately render other types of terrain outside of France. Future improvements could involve expanding the dataset to include a more diverse range of regions and landscapes.
