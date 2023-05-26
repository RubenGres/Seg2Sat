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
    { color: [197, 220, 66], label: 'ligneous'},
    { color: [153, 153, 255], label: 'greenhouse'},
    { color: [0, 0, 0], label: 'other'}
];

//export const API = 'https://radames-text2human-api.hf.space';
// export const API = 'http://localhost:7860';
//export const API = 'https://hf.space/embed/CVPR/Text2Human';
//export const API = 'https://hf.space/embed/hysts/Text2Human';
export const API = '/predict';

export const IMAGES_LIST = [
	'/samples/example0.png',
  '/samples/example1.png',
  '/samples/example2.png',
  '/samples/example3.png',
  '/samples/example4.png',
  '/samples/example5.png',
];


export const SECTIONS = [
    "upper clothing texture",
	"lower clothing texture",
    "region"
  ];

export const TEXTURES = [
    "pure color",
    "stripe/spline",
    "plaid/lattice",
    "floral",
    "denim"
  ];

export const PRESETS = [
  ["Aerial view, France. High resolution image, 4K, ultra detailed", "Realistic"],
  ["Aerial view, France. Colorful lego bricks", "Lego brick"],
  ["Aerial view, France. Black and white paper pencil drawing", "Pencil"],
  ["Aerial view, France. Oil on canvas painting", "Painting"]
];