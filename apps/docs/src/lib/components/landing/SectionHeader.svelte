<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: Snippet;
		description?: Snippet;
		large?: boolean;
	}

	let { title, description, large = false }: Props = $props();
</script>

<div class="mb-12 text-center" class:mb-10={large}>
	<h2
		class="text-2xl font-bold tracking-tight text-balance sm:text-3xl"
		class:sm:text-4xl={large}
		class:text-3xl={large}
	>
		{#if title}
			{@render title()}
		{/if}
	</h2>
	{#if description}
		<p class="text-muted-foreground mt-3 text-balance">
			{@render description()}
		</p>
	{/if}
</div>
