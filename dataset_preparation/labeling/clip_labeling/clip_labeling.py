from clip_interrogator import Config, Interrogator
from datasets import load_dataset
from tqdm import tqdm

ci = Interrogator(Config(clip_model_name="ViT-H-14/laion2b_s32b_b79k"))

dataset_name = "rgres/AerialDreams" #@param {type:"string"}
split = "train" #@param {type:"string"}
image_col = "image" #@param {type:"string"}
output_file = "desc.txt" #@param {type:"string"}

dataset = load_dataset(dataset_name, split=split, streaming=True)

with open(output_file, 'w', encoding='utf-8', newline='') as f:
  prompts = []
  for idx, line in enumerate(tqdm(dataset, desc='Generating prompts')):
      image = line[image_col].convert('RGB')
      prompt = ci.interrogate_fast(image)
      print(prompt)
      f.write(prompt + '\n')
