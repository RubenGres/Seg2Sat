<script lang="ts">
	import { nanoid } from 'nanoid';
	import PxBrush from 'px-brush';
	import { onMount } from 'svelte';
	import type { Brush } from '../types';
	import UndoIcon from '$lib/Icons/Undo.svelte';
	import { COLOR_LIST } from '../data';
	import { selectedBrush, selectedImage, currentCanvas, drawingLayers } from '$lib/store';

	let canvas: HTMLCanvasElement;
	let brush: HTMLCanvasElement;

	let brushCtx: CanvasRenderingContext2D;
	let ctx: CanvasRenderingContext2D;
	let startPosition: { x: number; y: number } = { x: 0, y: 0 };
	let pxBrush: PxBrush;
	$: {
		if (brushCtx && $selectedBrush) {
			setBrush($selectedBrush);
			brush.style.top = `${10 + $selectedBrush.size / 2}px`;
			brush.style.left = `${10 + $selectedBrush.size / 2}px`;
		}
	}
	$: {
		if ($selectedImage) {
			drawImage(ctx, $selectedImage);
			$drawingLayers = new Map();
		}
	}

	onMount(() => {
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		brushCtx = brush.getContext('2d') as CanvasRenderingContext2D;
		window.devicePixelRatio = 1;
		pxBrush = new PxBrush(canvas);
		canvas.style.height = 'unset';
		canvas.style.width = 'unset';
		$currentCanvas = canvas;
		clearCanvas(ctx);
	});

	let mouseDown: boolean = false;
	let currLayerId: string;
	function pointerEnter() {
		// brush.hidden = false;
	}
	function pointerOut() {
		brush.style.top = `${10 + $selectedBrush.size / 2}px`;
		brush.style.left = `${10 + $selectedBrush.size / 2}px`;
		mouseDown = false;
	}
	function pointerDown(e: MouseEvent) {
		mouseDown = true;
		startPosition = getPosition(canvas, e);
		pxBrush.draw({
			from: startPosition,
			to: startPosition,
			size: $selectedBrush.size,
			color: $selectedBrush.color
		});

		currLayerId = nanoid();
		drawingLayers.update((map) => {
			map.set(currLayerId, {
				brush: $selectedBrush,
				points: [{ from: startPosition, to: startPosition }]
			});
			return map;
		});
		// drawLayers();
	}
	function pointerMove(e: MouseEvent) {
		const position = getPosition(canvas, e);
		brush.style.top = `${e.offsetY}px`;
		brush.style.left = `${e.offsetX}px`;
		if (!mouseDown) {
			return;
		}
		pxBrush.draw({
			from: startPosition,
			to: position,
			size: $selectedBrush.size,
			color: $selectedBrush.color
		});

		drawingLayers.update((map) => {
			const currentLayer = map.get(currLayerId);
			currentLayer?.points.push({
				from: startPosition,
				to: position
			});
			return map;
		});
		startPosition = position;
		// drawLayers();
	}
	function getPosition(canvas: HTMLCanvasElement, event: MouseEvent) {
		const rect = canvas.getBoundingClientRect();
		return {
			x: (event.clientX - rect.left) * (canvas.width / rect.width),
			y: (event.clientY - rect.top) * (canvas.height / rect.height)
		};
	}
	function setBrush(sBrush: Brush) {
		const { size, color } = sBrush;
		brush.width = size;
		brush.height = size;
		// brushCtx.clearRect(0, 0, brush.width, brush.height);
		// brushCtx.beginPath();
		brushCtx.fillStyle = color;
		brushCtx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
		brushCtx.fill();
	}

	function clearCanvas(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = '#46e483';
		ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}
	function drawPixels(ctx: CanvasRenderingContext2D) {
		COLOR_LIST.forEach((c, i) => {
			pxBrush.draw({
				from: { x: i * 2, y: ctx.canvas.height },
				to: { x: i * 2, y: ctx.canvas.height - 3 },
				size: 2,
				color: `rgb(${c.color.join(',')})`
			});
		});
	}
	function drawImage(ctx: CanvasRenderingContext2D, img: HTMLImageElement | HTMLCanvasElement) {
		ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
	}
	function rollBack() {
		if ($drawingLayers.size <= 0) {
			return;
		}
		// clear current layer
		const ids = Array.from($drawingLayers.keys());
		drawingLayers.update((map) => {
			map.delete(ids[ids.length - 1]);
			return map;
		});
		drawLayers(ctx);
		// drawPixels(ctx);
	}
	function drawLayers(ctx: CanvasRenderingContext2D) {
		const tempcanvas = document.createElement('canvas');
		tempcanvas.width = 512;
		tempcanvas.height = 512;
		window.devicePixelRatio = 1;
		const pxBrush = new PxBrush(tempcanvas);
		clearCanvas(ctx);
		if ($selectedImage) {
			drawImage(ctx, $selectedImage);
		}
		Array.from($drawingLayers.values()).forEach((layer) => {
			// clear temp canvas
			layer.points.forEach((point, i) => {
				pxBrush.draw({
					from: point.from,
					to: point.to,
					size: layer.brush.size,
					color: layer.brush.color
				});
			});
		});
		requestAnimationFrame(() => {
			drawImage(ctx, tempcanvas);
		});
	}
</script>

<div>
	<div class="relative overflow-clip">
		<canvas
			bind:this={canvas}
			class="canvas"
			width="512"
			height="512"
			on:touchmove={(e) => e.preventDefault()}
			on:pointerenter={pointerEnter}
			on:pointerup={pointerOut}
			on:pointerleave={pointerOut}
			on:pointercancel={pointerOut}
			on:pointerout={pointerOut}
			on:pointermove={pointerMove}
			on:pointerdown={pointerDown}
		/>
		<canvas bind:this={brush} class="brush" width="10" height="10" />
		<span class="label">{$selectedBrush?.label} </span>
		<button
			class="absolute bottom-0 left-0 p-3"
			on:click|preventDefault={() => rollBack()}
			disabled={$drawingLayers.size <= 0}><UndoIcon /></button
		>
	</div>
</div>

<style lang="postcss" scoped>
	.canvas {
		@apply max-w-full w-full z-0 border border-gray-500 aspect-[512/512];
	}
	.brush {
		@apply z-10 absolute pointer-events-none -translate-x-1/2 -translate-y-1/2;
	}
	.label {
		@apply px-2 text-base z-20 absolute top-0 left-0 pointer-events-none text-white select-none;
		color: white;
		font-weight: bolder;
		-webkit-text-stroke: 1px black;
		-webkit-text-fill-color: white;
	}
</style>
