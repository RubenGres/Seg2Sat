<script lang="ts">
	let canvas: HTMLCanvasElement;
	import { API } from '../data';
	import { nanoid } from 'nanoid';
	import type { Params } from '../types';

	import {
		selectedParams,
		generateMap,
		currentCanvas,
		resultImage,
		saveResult
	} from '$lib/store';

	$: (async () => {
		if ($generateMap) {
			const results = await predict($currentCanvas.toDataURL(), $selectedParams);
			$resultImage = results;
			$generateMap = false;
		}
	})();

	$: (async () => {
		if ($saveResult) {
			const results = await saveImage($resultImage);
			$saveResult = false;
		}
	})();

	let predictStatus: string = '';
	async function saveImage(base64Image: string) {
		return new Promise((resolve, reject) => {
			try {
				const a = document.createElement('a');
				a.download = `sucess-${Date.now()}.png`;
				a.target = '_self';
				a.onclick = async (e) => {
					if (a.href) {
						URL.revokeObjectURL(a.href);
					}
					a.href = base64Image;
				};
				requestAnimationFrame(() => {
					console.log('Downloading image.');
					a.click();
					resolve(null);
				});
			} catch (err) {
				reject();
			}
		});
	}

	async function predict(base64Image: string, { prompt, steps, seed }: Params) {
		const response = await fetch('/predict', {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			data: [base64Image, prompt, steps, seed.toString()],
			}),
		});

		if (!response.ok) {
			throw new Error('Prediction request failed.');
		}

		const result = await response.text();
		return result;
	}
</script>

<div class="relative overflow-clip flex flex-col justify-center items-center w-full h-full">
	{#if $resultImage}
		<img
			class="image {$generateMap ? 'opacity-30' : ''}"
			alt="Generative Map Result"
			src={$resultImage}
			width="512"
			height="512"
		/>
	{/if}
	{#if $generateMap}
		<div class="loading">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="animate-spin max-w-[3rem]"
			>
				<path
					fill="currentColor"
					d="M20 12a8 8 0 0 1-8 8v4a12 12 0 0 0 12-12h-4Zm-2-5.3a8 8 0 0 1 2 5.3h4c0-3-1.1-5.8-3-8l-3 2.7Z"
				/>
			</svg>
			<span class="text-xs">{predictStatus}</span>
		</div>
	{/if}
</div>

<!-- {/if} -->
<style lang="postcss" scoped>
	.image {
		@apply box-border z-0 border dark:border-gray-300 border-gray-500 aspect-[512/512];
	}
	.loading {
		@apply absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center;
	}
</style>
