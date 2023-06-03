export interface Color {
	color: number[];
	label: string;
}
export type RGB = `rgb(${number},${number},${number})`;
export interface Brush {
	color: RGB;
	size: number;
	label: string;
}

export interface Params {
	prompt: string;
	modifier: string;
	seed: bigint;
	steps: number;
}

export interface FormElements extends HTMLCollection {
	prompt: HTMLInputElement;
	modifier: HTMLInputElement;
	seed: HTMLInputElement;
	steps: HTMLInputElement;
}
interface Point {
	x: number;
	y: number;
}
interface pxPoint {
	from: Point;
	to: Point;
}
export interface DrawingLayer {
	brush: Brush;
	points: pxPoint[];
}
