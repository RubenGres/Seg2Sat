import os
from tqdm import tqdm


# get all image path
image_folder = "./data/hf_dataset"
masks = [(f"{image_folder}/{dir}/MSK_{dir}.png", f"{image_folder}/{dir}/REP_{dir}.json") for dir in os.listdir(image_folder)]

commands = []
for input_file, output_file in tqdm(masks):
    commands.append(f"python3 /Volumes/ESPACE_TRAVAIL_Puma/DANI/RUBEN/STABLEDIFFUSION/OCSGE/get_image_segmentation.py {input_file} {output_file}")

str_cmd = '\n'.join(commands)

text_file = open("commands.txt", "w")
text_file.write(str_cmd)
text_file.close()