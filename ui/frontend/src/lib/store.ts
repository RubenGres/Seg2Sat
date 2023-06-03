import { writable } from 'svelte/store';
import type { Brush, Params, DrawingLayer } from '../types';
import { randomSeed } from '$lib/utils';
import { PRESETS } from '../data';

export const drawingLayers = writable<Map<string, DrawingLayer>>(new Map());
export const resultImage = writable<string>();
export const currentCanvas = writable<HTMLCanvasElement>();
export const selectedImage = writable<HTMLImageElement>();
export const selectedBrush = writable<Brush>();
export const selectedParams = writable<Params>({
	prompt: "Aerial view of rue des Lilas, Toulouse, Haute-Garonne, France",
	modifier: PRESETS[0][0],
	seed: randomSeed(),
	steps: 20
});

export const generateMap = writable<boolean>(false);
export const saveResult = writable<boolean>(false);