<script lang="ts">
	import Logo from '$lib/components/logos/Logo.svelte';
	import { DocsLayout } from '@svecodocs/kit';
	import { navigation } from '$lib/navigation';

	let { children } = $props();
</script>

<DocsLayout {navigation}>
	{#snippet logo()}
		<Logo variant="dark" class="hidden max-h-6 dark:block" />
		<Logo variant="light" class="block max-h-6 dark:hidden" />
		<span class="sr-only">tw-easing-gradients</span>
	{/snippet}

	{@render children?.()}
</DocsLayout>
