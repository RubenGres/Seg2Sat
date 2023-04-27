import os
from glob import glob
from tqdm import tqdm
import json

image_folder = "./data/flair_aerial_train"
output_dir = "./data/hf_dataset"
metadata_path = "./data/flair-1_metadata_aerial.json"


def get_output_path(path, output_dir, ext):
    basename = os.path.basename(path).split('.')[0]
    folder = basename.split('_')[1]

    if not os.path.exists(f"{output_dir}/{folder}/"):
        os.mkdir(f"{output_dir}/{folder}/")

    output_path = f"{output_dir}/{folder}/{basename}.{ext}"
    
    return output_path


# get all image path
test_tif_img = list(glob(f"{image_folder}/*/*/img/*.tif"))

f = open(metadata_path, 'r')
metadata_json = json.load(f)

commands = []
for path in tqdm(test_tif_img):
    basename = os.path.basename(path).split('.')[0]
    ocsge_metadata = metadata_json[basename]

    jpg_path = get_output_path(path, output_dir, 'json')
    cmd = f'python3 /Volumes/ESPACE_TRAVAIL_Puma/DANI/RUBEN/STABLEDIFFUSION/OCSGE/get_metadata.py {path} {jpg_path} "{ocsge_metadata}"'

    commands.append(cmd)

str_cmd = '\n'.join(commands)

text_file = open("commands.txt", "w")
text_file.write(str_cmd)
text_file.close()