<script lang="ts">
	import { COLOR_LIST } from '../data';
	import type { Brush, RGB } from '../types';
	import { selectedBrush } from '$lib/store';

	const STARTCOLORID = 6;
	const { color, label } = COLOR_LIST[STARTCOLORID];

	let brushColor: RGB = `rgb(${color.join(',')})` as RGB;
	let brushSize: number = 40;
	$selectedBrush = {
		color: brushColor,
		size: brushSize,
		label
	};
	const submit = async (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.name === 'color') {
			const selectedId = parseInt(target.value);
			const { color, label } = COLOR_LIST[selectedId];
			brushColor = `rgb(${color.join(',')})` as RGB;
			$selectedBrush = {
				color: brushColor,
				size: brushSize,
				label
			};
		} else if (target.name === 'brush') {
			brushSize = parseInt(target.value);
			$selectedBrush = {
				color: brushColor,
				size: brushSize,
				label
			};
		}
	};
</script>

<form on:input={submit}>
	<h4 class="font-bold mt-6 mb-2 leading-6 my-3">Brush Type</h4>
	<div class="colors" name="colors">
		{#each COLOR_LIST as color, id}
			<div class="snap-always snap-start">
				<input name="color" checked={id == STARTCOLORID} type="radio" id="color-{id}" value={id} />
				<label for="color-{id}">
					<svg width="20" height="20" viewBox="0 0 20 20">
						<rect x="0" y="0" width="20" height="20" fill="rgb({color.color.join(',')})" /></svg
					>
					<span>{color.label}</span>
				</label>
			</div>
		{/each}
	</div>
	<h4 class="font-bold mt-6 mb-2 my-6 leading-6">Brush Size</h4>
	<div class="brush">
		<input value="10" min="1" max="150" step="1" name="brush" type="range" />
		<label class="pl-2" for="brush">{$selectedBrush.size}</label>
	</div>
</form>

<style lang="postcss" scoped>
	.colors {
		@apply grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[9rem] sm:max-h-[none] overflow-scroll snap-y snap-mandatory;
	}
	.colors span {
		@apply ml-2;
	}
	.colors svg {
		@apply block;
	}
	input[type='radio'] {
		@apply opacity-0 w-0 h-0 absolute hidden;
	}
	input[type='radio']:active ~ label {
	}
	input[type='radio']:checked ~ label {
		@apply outline outline-2 outline-yellow-500;
	}
	label {
		@apply cursor-pointer flex transition-all duration-200 ease-in-out whitespace-nowrap
			hover:outline outline-offset-[-2px] outline-2 outline-yellow-500;
	}
	.brush {
		@apply flex;
	}
</style>
