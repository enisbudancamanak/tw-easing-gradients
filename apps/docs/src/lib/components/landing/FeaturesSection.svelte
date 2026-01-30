<script lang="ts">
	import Lightning from 'phosphor-svelte/lib/Lightning';
	import Compass from 'phosphor-svelte/lib/Compass';
	import Palette from 'phosphor-svelte/lib/Palette';
	import Code from 'phosphor-svelte/lib/Code';
	import Gradient from 'phosphor-svelte/lib/Gradient';
	import Gauge from 'phosphor-svelte/lib/Gauge';
	import FeatureCard from '$lib/components/FeatureCard.svelte';
	import SectionHeader from './SectionHeader.svelte';

	const features = [
		{
			title: '4 Easing Functions',
			description:
				'ease, ease-in, ease-out, ease-in-out. Matching CSS timing functions you already know.',
			icon: Lightning
		},
		{
			title: '8 Directions',
			description:
				'All cardinal and diagonal directions. Use bg-ease-to-r, bg-ease-to-tl, and more.',
			icon: Compass
		},
		{
			title: 'OKLCH Color Space',
			description:
				'Colors blend naturally without getting gray or muddy in the middle.',
			icon: Palette
		},
		{
			title: 'Zero Runtime JS',
			description:
				'Pure CSS output. No JavaScript, no hydration cost, no bundle size impact.',
			icon: Gauge
		},
		{
			title: 'from-*/to-* Support',
			description:
				"Works with Tailwind's native gradient color utilities. Use any color value.",
			icon: Code
		},
		{
			title: 'Pure CSS',
			description:
				'Generates standard CSS gradients with multiple color stops for smooth easing.',
			icon: Gradient
		}
	] as const;
</script>

<section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
	<SectionHeader>
		{#snippet title()}
			Built for modern CSS
		{/snippet}
		{#snippet description()}
			Everything you need for production-grade eased gradients.
		{/snippet}
	</SectionHeader>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each features as feature (feature.title)}
			<FeatureCard title={feature.title} description={feature.description}>
				{#snippet icon()}
					<feature.icon class="size-5" />
				{/snippet}
			</FeatureCard>
		{/each}
	</div>
</section>
