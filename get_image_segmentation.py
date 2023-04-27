import os
os.environ['OPENBLAS_NUM_THREADS'] = '1'
import argparse
from osgeo import gdal
import numpy as np
from PIL import Image

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

def convert_to_seg(image_array, lut):
    def hex_to_tuple(hex):
        h = hex.lstrip('#')
        return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

    for i in range(image_array.shape[0]):
        for j in range(image_array.shape[1]):
            class_id = image_array[i, j][0]
            
            color = hex_to_tuple(lut[class_id-1]["color"]) if class_id < len(lut) else (0,0,0)

            image_array[i, j] = color

    # Convert the NumPy array back to an image and save it to a file
    return image_array


def convert_seg(input_path, output_path, LUT):
    input_tif = gdal.Open(input_path)
    rgb_data = np.zeros((input_tif.RasterYSize, input_tif.RasterXSize, 3), dtype=np.uint8)

    rgb_data[..., 0] = input_tif.GetRasterBand(1).ReadAsArray()
    rgb_data = convert_to_seg(rgb_data, LUT)

    # Close input TIFF file
    input_tif = None

    img = Image.fromarray(rgb_data)
    img.save(output_path)


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

convert_seg(ARGS.input_path, ARGS.output_path, LUT)