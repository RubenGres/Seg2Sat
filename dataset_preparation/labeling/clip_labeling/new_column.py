from datasets import load_dataset

dataset_name = "rgres/AerialDreams" #@param {type:"string"}
split = "train" #@param {type:"string"}
output_file = "desc.txt" #@param {type:"string"}

dataset = load_dataset(dataset_name, split=split)

with open(output_file, 'r', encoding='utf-8', newline='') as f:
    labels = [line.strip() for line in f.readlines()]

ds = dataset.add_column("clip_label", labels)
ds.push_to_hub("rgres/AerialDreams")