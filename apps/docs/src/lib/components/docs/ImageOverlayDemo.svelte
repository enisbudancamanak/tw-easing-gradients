<script lang="ts">
	import ImageCompare from './ImageCompare.svelte';
	import BandingAnnotation from '$lib/components/BandingAnnotation.svelte';

	let position = $state(50);
</script>

<div class="not-prose @container relative my-8">
	<ImageCompare
		leftClass="bg-linear-to-t from-black to-transparent"
		rightClass="bg-ease-in-out-to-t from-black to-transparent"
		class="aspect-4/3 min-h-64 w-full sm:aspect-auto sm:h-80"
		bind:position
	/>
	<BandingAnnotation {position} />
</div>
