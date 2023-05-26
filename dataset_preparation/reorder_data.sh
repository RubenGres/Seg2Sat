#!/bin/bash

source_dir="$1"
prev_dir=""

for folder in "$source_dir"/[0-9][0-9][0-9][0-9][0-9][0-9]; do
    folder_name=$(basename "$folder")
    new_dir="${folder_name:0:3}"

    if [ "$new_dir" != "$prev_dir" ]; then
        echo "Creating directory: $new_dir"
    fi

    mv "$folder" "$source_dir/$new_dir"/"

    prev_dir="$new_dir"
done