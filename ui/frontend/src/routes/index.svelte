<script lang="ts">
	import TemplateGallery from "$lib/TemplateGallery.svelte";
	import BrushSelector from "$lib/BrushSelector.svelte";
	import ParamSelector from "$lib/ParamsSelector.svelte";
	import DrawingCanvas from "$lib/DrawingCanvas.svelte";
	import ResultCanvas from "$lib/ResultCanvas.svelte";
	import { generateMap, saveResult, resultImage } from "$lib/store";

	let results = false;
</script>

<div class="max-w-screen-md mx-auto px-3 py-5 relative z-0">
	<article class="prose">
		<h1>Drawing to Map</h1>
		<p> This space is for the ControlNet model <a href="https://github.com/RubenGres/Drawing2Map" target="_blank"><span>Drawing2Map</span></a></p>
	</article>


	<BrushSelector />
	<div class="drawings py-3 -mx-3">
		<DrawingCanvas />
		<ResultCanvas />
	</div>

	<button
		on:click|preventDefault={() => ($generateMap = true)}
		disabled={$generateMap === true}
		class="green"
	>
		Generate Map
	</button>

	<button
		on:click|preventDefault={() => ($saveResult = true)}
		disabled={$saveResult === true || !$resultImage}
	>
		Save Result
	</button>

	<TemplateGallery />

	<ParamSelector />
</div>

<style lang="postcss" scoped>
	.drawings {
		@apply grid grid-cols-[2fr_1.5fr] sm:grid-cols-2 place-items-center;
	}
	button {
		@apply p-1 disabled:opacity-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-50 dark:border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500;
	}
	.green {
		background-color: lightgreen;
		font-weight: bold;
		font-size: 1.2em;
	}
</style>
