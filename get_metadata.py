import os
os.environ['OPENBLAS_NUM_THREADS'] = '1'
import argparse
from osgeo import gdal, osr
import numpy as np
from PIL import Image
import json
import requests
from pyproj import CRS, Transformer


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

    parser.add_argument(
        'metadata',
        type=str,
        help="metadata json"
    )

    return parser.parse_args()


def get_osm_data(latlon):
    lat, lon = convert_to_latlon(latlon)
    url = f'https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}&zoom=18&addressdetails=1'
    response = requests.get(url)
    return response.json()


def convert_to_latlon(coord, proj=None):
    if not proj:
        proj = 2154

    input_crs = CRS(f"EPSG:{proj}")
    wgs84_crs = CRS("EPSG:4326")  # WGS 84 (latitude et longitude)
    transformer = Transformer.from_crs(input_crs, wgs84_crs)
    return transformer.transform(*coord)


def get_tif_metadata(input_path):
    tif_dataset = gdal.Open(input_path)

    # Get the origin, dimensions, and CRS
    geotransform = tif_dataset.GetGeoTransform()
    name = os.path.basename(input_path)
    origin = (geotransform[0], geotransform[3])
    dimensions = (tif_dataset.RasterXSize, tif_dataset.RasterYSize)

    # Get the CRS
    crs_wkt = tif_dataset.GetProjection()
    crs = osr.SpatialReference()
    crs.ImportFromWkt(crs_wkt)

    # Get the units
    unit_type = crs.GetLinearUnitsName()

    srs = osr.SpatialReference()
    srs.ImportFromWkt(tif_dataset.GetProjection())
    code = srs.GetAuthorityCode(None)

    latlon = convert_to_latlon(origin, code)

    # Create a dictionary to store the metadata
    metadata = {
        "origin": origin,
        "dimensions": dimensions,
        "unit_system": unit_type,
        "code": code,
        "latlong": latlon   
    } 

    return metadata


def get_metadata(input_path, output_path, ocsge_metadata):
    ocsge_metadata = json.loads(ocsge_metadata.replace("'", '"'))

    centroid = (ocsge_metadata['patch_centroid_x'], ocsge_metadata['patch_centroid_y'])
    osm_metadata = get_osm_data(centroid)

    print(osm_metadata)

    tif_metadata = get_tif_metadata(input_path)

    combined_metadata = tif_metadata | ocsge_metadata | osm_metadata

    with open(output_path, "w") as fp:
        json.dump(combined_metadata, fp)

ARGS = arg_parser()

get_metadata(ARGS.input_path, ARGS.output_path, ARGS.metadata)
