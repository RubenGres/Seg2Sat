from PIL import Image
import os
os.environ['OPENBLAS_NUM_THREADS'] = '1'
import argparse
from osgeo import gdal
import numpy as np
from PIL import Image
import json


def arg_parser():
    """ Extraction des arguments de la ligne de commande """
    parser = argparse.ArgumentParser()

    parser.add_argument(
        'input_path',
        type=str,
        help="input_path"
    )

    parser.add_argument(
        'output_path',
        type=str,
        help="output_path"
    )

    return parser.parse_args()


LUT = [
    {"color": "#db0e9a", "class": "building"},
    {"color": "#938e7b", "class": "pervious surface"},
    {"color": "#f80c00", "class": "impervious surface"},
    {"color": "#a97101", "class": "bare soil"},
    {"color": "#1553ae", "class": "water"},
    {"color": "#194a26", "class": "coniferous"},
    {"color": "#46e483", "class": "deciduous"},
    {"color": "#f3a60d", "class": "brushwood"},
    {"color": "#660082", "class": "vineyard"},
    {"color": "#55ff00", "class": "herbaceous vegetation"},
    {"color": "#fff30d", "class": "agricultural land"},
    {"color": "#e4df7c", "class": "plowed land"},
    {"color": "#3de6eb", "class": "swimming pool"},
    {"color": "#ffffff", "class": "snow"},
    {"color": "#8ab3a0", "class": "clear cut"},
    {"color": "#6b714f", "class": "mixed"},
    {"color": "#c5dc42", "class": "ligneous"},
    {"color": "#9999ff", "class": "greenhouse"},
    {"color": "#000000", "class": "other"}
]

ARGS = arg_parser()


def get_color_percentages(image_path, color_mapper=None):
    # Open image and convert to RGB mode
    with Image.open(image_path).convert("RGB") as image:
        # Get a list of (count, color) tuples
        color_counts = image.getcolors(image.size[0] * image.size[1])
    
    # Convert each (R, G, B) tuple to a hex string and store percentages in a dict
    color_percentages = {}
    total_pixels = sum(count for count, color in color_counts)
    for count, (r, g, b) in color_counts:
        hex_color = f"#{r:02x}{g:02x}{b:02x}"
        
        if color_mapper:
            hex_color = color_mapper(hex_color)

        color_percentages[hex_color] = count / total_pixels
    
    return color_percentages


def color_mapper(color_code):
    for color_dict in LUT:
        if color_dict['color'] == color_code:
            return color_dict['class']
    return color_code
  

classes_pct_dict = get_color_percentages(ARGS.input_path, color_mapper)
classes = {"class_repartition": classes_pct_dict}

with open(ARGS.output_path, 'w') as f:
    json.dump(classes, f)