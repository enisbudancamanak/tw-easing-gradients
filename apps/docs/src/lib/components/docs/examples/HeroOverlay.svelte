<script lang="ts">
	import heroImage from '$lib/assets/hero-mountain.jpg?url';
</script>

<div class="not-prose my-6">
	<div class="relative h-72 overflow-hidden rounded-xl">
		<img
			src={heroImage}
			alt="Mountain landscape"
			class="absolute inset-0 size-full object-cover"
			sizes="(min-width: 768px) 720px, 100vw"
		/>
		<div class="bg-ease-to-t absolute inset-0 from-black"></div>
		<div class="absolute bottom-6 left-6">
			<h1 class="text-3xl font-bold text-white">Hero Title</h1>
			<p class="text-white/70">Smooth fade into the image</p>
		</div>
	</div>
</div>
