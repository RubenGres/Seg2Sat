import os
from glob import glob
from tqdm import tqdm

image_folder = "./data/flair_aerial_train"
output_dir = "./data/hf_dataset"
metadata_path = "./data/flair-1_metadata_aerial.json"

def convert_path_img_to_msk(path):
    return (
        path
        .replace('aerial', 'labels')
        .replace('img', 'msk')
        .replace('IMG', 'MSK')
    )


def get_output_path(path, output_dir, ext):
    basename = os.path.basename(path).split('.')[0]
    folder = basename.split('_')[1]

    if not os.path.exists(f"{output_dir}/{folder}/"):
        os.mkdir(f"{output_dir}/{folder}/")

    output_path = f"{output_dir}/{folder}/{basename}.{ext}"
    
    return output_path


# get all image path
test_tif_img = []

for file_name in glob(f"{image_folder}/*/*/img/*.tif"):
    test_tif_img.append(file_name)

test_tif_msk = [convert_path_img_to_msk(p) for p in test_tif_img]
data = dict(zip(['image', 'seg'], [test_tif_img, test_tif_msk]))

commands = []
seg_path = data['seg']
for path in tqdm(seg_path):
    jpg_path = get_output_path(path, output_dir, 'png')
    commands.append(f"python3 /Volumes/ESPACE_TRAVAIL_Puma/DANI/RUBEN/STABLEDIFFUSION/OCSGE/convert_seg.py {path} {jpg_path}")

str_cmd = '\n'.join(commands)

text_file = open("commands.txt", "w")
text_file.write(str_cmd)
text_file.close()