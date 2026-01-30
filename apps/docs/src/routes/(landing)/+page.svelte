<script lang="ts">
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import HeroSection from '$lib/components/landing/HeroSection.svelte';
	import ComparisonSection from '$lib/components/landing/ComparisonSection.svelte';
	import FeaturesSection from '$lib/components/landing/FeaturesSection.svelte';
	import CodeExampleSection from '$lib/components/landing/CodeExampleSection.svelte';
	import EasingGallerySection from '$lib/components/landing/EasingGallerySection.svelte';
	import FooterSection from '$lib/components/landing/FooterSection.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>tw-easing-gradients - Smooth CSS Gradients for Tailwind CSS</title>
	<meta
		name="description"
		content="Linear gradients often produce hard edges where colors meet. This Tailwind CSS plugin applies easing functions for smoother, more natural gradients."
	/>
</svelte:head>

<div class="bg-background-secondary text-foreground min-h-svh">
	<SiteHeader />
	<HeroSection stars={data.stars} />
	<ComparisonSection />
	<FeaturesSection />
	<CodeExampleSection />
	<EasingGallerySection />
	<FooterSection />
</div>
