<script lang="ts">
	import ImageCompare from '$lib/components/docs/ImageCompare.svelte';
	import BandingAnnotation from '$lib/components/BandingAnnotation.svelte';
	import SectionHeader from './SectionHeader.svelte';

	let position = $state(50);
</script>

<section class="mx-auto max-w-screen-xl px-4 py-20 sm:px-6">
	<SectionHeader large>
		{#snippet title()}
			See the difference
		{/snippet}
		{#snippet description()}
			Drag the slider to compare linear vs eased gradients.
		{/snippet}
	</SectionHeader>
	<div class="relative mx-auto max-w-2xl">
		<ImageCompare
			leftClass="bg-linear-to-t from-black to-transparent"
			rightClass="bg-ease-in-out-to-t from-black to-transparent"
			class="aspect-4/3 min-h-70 w-full sm:aspect-auto sm:h-80"
			bind:position
		/>
		<BandingAnnotation {position} />
	</div>
</section>
