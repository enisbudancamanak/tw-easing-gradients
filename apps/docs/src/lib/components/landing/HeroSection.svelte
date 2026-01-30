<script lang="ts">
	import InstallButton from '$lib/components/InstallButton.svelte';
	import GitHubStarButton from '$lib/components/GitHubStarButton.svelte';
	import { BRAND_COLORS } from '$lib/constants';
	import { Button } from '@svecodocs/kit';

	interface Props {
		stars?: number | null;
	}

	let { stars = null }: Props = $props();
</script>

<section class="relative overflow-hidden">
	<div class="bg-grid absolute inset-0"></div>
	<div
		class="via-background-secondary/50 to-background-secondary absolute inset-0 bg-linear-to-b from-transparent"
	></div>

	<div
		class="relative mx-auto max-w-screen-xl px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28"
	>
		<div class="flex flex-col items-center text-center">
			<div
				class="bg-ease-in-out-to-r mb-4 h-px w-32 rounded-full sm:h-1.5"
				style="--tw-gradient-from: {BRAND_COLORS.from}; --tw-gradient-to: {BRAND_COLORS.to};"
			></div>

			<h1
				class="max-w-3xl text-4xl leading-tight font-bold tracking-tight text-balance sm:text-6xl"
			>
				easing gradients for
				<span
					class="bg-ease-in-out-to-r bg-clip-text text-transparent"
					style="--tw-gradient-from: {BRAND_COLORS.from}; --tw-gradient-to: {BRAND_COLORS.to};"
				>
					Tailwind CSS
				</span>
			</h1>

			<p
				class="text-muted-foreground mt-6 max-w-xl text-lg leading-relaxed text-balance"
			>
				Linear gradients produce hard color transitions. Fix them with easing
				functions, directly in your utility classes.
			</p>

			<div class="mt-10">
				<InstallButton />
			</div>

			<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
				<Button variant="default" href="/docs">Get Started</Button>
				<Button variant="brand" href="/playground">Playground</Button>
				<GitHubStarButton {stars} />
			</div>
		</div>
	</div>
</section>
