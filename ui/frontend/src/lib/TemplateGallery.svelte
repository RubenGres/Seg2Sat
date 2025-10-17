<script lang="ts">
	import { IMAGES_LIST } from '../data';
	import { selectedImage, generateMap } from '$lib/store';
	import { base } from '$app/paths';

	const submit = async (e: Event) => {
		e.preventDefault();
		const src = IMAGES_LIST[parseInt((e.target as HTMLInputElement).value)];
		if (src) {
			const blob = await fetch(base + src).then((res) => res.blob())
			const img = await getImage(blob);
			$selectedImage = img;
		}
	};

	const handleFileUpload = async (e: Event) => {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		
		if (file && file.type.startsWith('image/')) {
			const img = await getImage(file);
			$selectedImage = img;
			
			// Uncheck all radio buttons
			const radios = document.querySelectorAll('input[name="samples"]');
			radios.forEach((radio) => {
				(radio as HTMLInputElement).checked = false;
			});
		}
	};

	async function getImage(blob: Blob): Promise<HTMLImageElement> {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				URL.revokeObjectURL(img.src);
				resolve(img);
			};
			img.onerror = (err) => {
				reject(err);
			};
			img.src = URL.createObjectURL(blob);
		});
	}
</script>

<div>
	<h4 class="font-bold mt-6 mb-2 my-6 leading-6">Select a Template</h4>
	
	<!-- Upload Image Section -->
	<div class="mb-4">
		<label for="image-upload" class="upload-label">
			<span class="upload-text">Upload Your Own Image</span>
			<input
				id="image-upload"
				type="file"
				accept="image/*"
				on:change={handleFileUpload}
				disabled={$generateMap === true}
				class="file-input"
			/>
		</label>
	</div>

	<form on:input={submit}>
		<div class="samples">
			{#each IMAGES_LIST as file_name, id}
				<div class="snap-always snap-start">
					<input
						type="radio"
						name="samples"
						id="sample-{id}"
						value={id}
						disabled={$generateMap === true}
					/>
					<label for="sample-{id}">
						<img src={base + file_name} alt={file_name} />
					</label>
				</div>
			{/each}
		</div>
	</form>
</div>

<style lang="postcss" scoped>
	form {
		@apply overflow-hidden w-full;
	}
	.samples {
		@apply flex overflow-x-scroll flex-nowrap snap-x snap-mandatory gap-1 scrollbar-hide;
	}
	input[type='radio'] {
		@apply disabled:opacity-50 opacity-0 w-0 h-0 absolute hidden;
	}
	input[type='radio']:active ~ label {
	}
	input[type='radio']:checked ~ label {
		@apply outline outline-2 outline-yellow-500;
	}
	input[type='radio']:disabled + label {
		@apply opacity-50;
	}
	label {
		@apply cursor-pointer flex transition-all duration-200 ease-in-out
			hover:outline outline-offset-[-2px] outline-2 outline-yellow-500;
	}
	img {
		@apply max-h-24 max-w-none;
	}
	
	/* Upload styles */
	.upload-label {
		@apply block w-full cursor-pointer px-4 py-3 border-2 border-dashed border-yellow-500 
			rounded-lg text-center transition-all duration-200 ease-in-out
			hover:bg-yellow-50 hover:border-yellow-600;
	}
	.upload-label:has(.file-input:disabled) {
		@apply opacity-50 cursor-not-allowed hover:bg-transparent;
	}
	.upload-text {
		@apply text-sm font-medium text-gray-700;
	}
	.file-input {
		@apply hidden;
	}
</style>