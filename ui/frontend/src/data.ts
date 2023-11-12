import type { Color } from './types';

export const COLOR_LIST: Color[] = [
	{ color: [219, 14, 154], label: 'building'},
    { color: [147, 142, 123], label: 'pervious surface'},
    { color: [248, 12, 0], label: 'impervious surface'},
    { color: [169, 113, 1], label: 'bare soil'},
    { color: [21, 83, 174], label: 'water'},
    { color: [25, 74, 38], label: 'coniferous'},
    { color: [70, 228, 131], label: 'deciduous'},
    { color: [243, 166, 13], label: 'brushwood'},
    { color: [102, 0, 130], label: 'vineyard'},
    { color: [85, 255, 0], label: 'herbaceous vegetation'},
    { color: [255, 243, 13], label: 'agricultural land'},
    { color: [228, 223, 124], label: 'plowed land'},
    { color: [61, 230, 235], label: 'swimming pool'},
    { color: [255, 255, 255], label: 'snow'},
    { color: [138, 179, 160], label: 'clear cut'},
    { color: [107, 113, 79], label: 'mixed'},
];

export const API = 'https://zqz606ggn85ysase.us-east-1.aws.endpoints.huggingface.cloud';

export const IMAGES_LIST = [
	'/samples/default.jpg',
	'/samples/example0.png',
  '/samples/example1.png',
  '/samples/example2.png',
  '/samples/example3.png',
  '/samples/example4.png',
  '/samples/example5.png',
  '/samples/example6.jpg',
];


export const PRESETS = [
  ["High resolution satellite image, 4K, ultra detailed", "Realistic"],
  ["Colorful lego bricks", "Lego brick"],
  ["Black and white paper pencil drawing", "Pencil"],
  ["Oil on canvas painting", "Painting"]
];