<script lang="ts">
	import GradientStrip from '$lib/components/GradientStrip.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import { BRAND_COLORS } from '$lib/constants';
</script>

<section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
	<SectionHeader>
		{#snippet title()}
			Easing gallery
		{/snippet}
		{#snippet description()}
			Compare all four easing functions side by side.
		{/snippet}
	</SectionHeader>
	<div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
		<GradientStrip
			label="linear (Tailwind)"
			gradientClass="bg-linear-to-r"
			fromClass="from-indigo-500"
			toClass="to-cyan-500"
		/>
		<GradientStrip
			label="ease"
			gradientClass="bg-ease-to-r"
			from={BRAND_COLORS.from}
			to={BRAND_COLORS.to}
		/>
		<GradientStrip
			label="ease-in"
			gradientClass="bg-ease-in-to-r"
			from={BRAND_COLORS.from}
			to={BRAND_COLORS.to}
		/>
		<GradientStrip
			label="ease-out"
			gradientClass="bg-ease-out-to-r"
			from={BRAND_COLORS.from}
			to={BRAND_COLORS.to}
		/>
		<GradientStrip
			label="ease-in-out"
			gradientClass="bg-ease-in-out-to-r"
			from={BRAND_COLORS.from}
			to={BRAND_COLORS.to}
		/>
	</div>
</section>
