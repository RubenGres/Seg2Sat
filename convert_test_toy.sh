#!/bin/bash

folder_path="data/flair_base/flair_1_toy_labels_test/"

find "$folder_path" -type f -name "*.tif" | while read -r file; do
    echo $file
    filename=$(basename "$file")
    python3 get_image_segmentation.py "$file" "validation/${filename%.*}.png"
done
