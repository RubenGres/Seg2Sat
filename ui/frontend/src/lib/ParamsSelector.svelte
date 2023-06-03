<script lang="ts">
	import { PRESETS } from '../data';
	import { selectedParams, generateMap } from '$lib/store';
	import type { FormElements } from '../types';
	import { randomSeed } from '$lib/utils';
	function submit() {
		const elements: FormElements = form.elements as FormElements;
		$selectedParams = {
			prompt: elements.prompt.value,
			modifier: elements.modifier.value,
			seed: BigInt(elements.seed.value),
			steps: parseInt(elements.steps.value)
		};
	}

	let form: HTMLFormElement;
	let seed: bigint = $selectedParams.seed;
	let sampleSteps: number = $selectedParams.steps;
	let prompt: string = $selectedParams.prompt;
	let modifier: string = $selectedParams.modifier;
</script>

<form bind:this={form} on:input={submit}>
	<h4 class="font-bold mt-6 mb-2 my-6 leading-6">Prompt</h4>
	<input
		bind:value={prompt}
		name="prompt"
		placeholder="Aerial view of ..., France."
		disabled={$generateMap === true}
		style="width: 500px;"
	/>

	<h4 class="font-bold mt-6 mb-2 my-6 leading-6">Modifier</h4>
	<input
		bind:value={modifier}
		name="modifier"
		placeholder="High resolution satellite image"
		disabled={$generateMap === true}
		style="width: 500px;"
	/>
	<select
		name="presets"
		disabled={$generateMap === true}
		on:change={(event) => {
			//modifier = event.currentTarget.value;
			const selectedIndex = event.currentTarget.selectedIndex - 1;
			modifier = PRESETS[selectedIndex][0];
			$selectedParams.modifier = PRESETS[selectedIndex][0];
	  	}}>
		<option disabled selected>preset</option>
		{#each PRESETS as preset}
			<option value={preset[0]}>{preset[1]}</option>`
		{/each}
	</select>

	<h4 class="font-bold mt-6 mb-2 my-6 leading-6">Random Seed</h4>
	<input
		bind:value={seed}
		type="Number"
		name="seed"
		placeholder="Integer Seed"
		disabled={$generateMap === true}
	/>
	<button
		on:click|preventDefault={() => {
			seed = randomSeed();
			submit();
		}}
		disabled={$generateMap === true}
	>
		Random
	</button>
	<h4 class="font-bold mt-6 mb-2 my-6 leading-6">Sample Steps</h4>
	<div class="flex">
		<input
			bind:value={sampleSteps}
			type="range"
			name="steps"
			min="10"
			max="30"
			step="1"
			disabled={$generateMap === true}
		/>
		<label class="pl-2" for="steps">{sampleSteps}</label>
	</div>
</form>

<style lang="postcss" scoped>
	.sections {
		@apply flex sm:flex-row flex-col gap-1 sm:gap-3;
	}
	select,
	button,
	input {
		@apply p-1 disabled:opacity-50 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-50 dark:border-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500;
	}
	input:disabled + label {
		@apply opacity-50;
	}
	input {
		@apply pl-3;
	}
</style>
