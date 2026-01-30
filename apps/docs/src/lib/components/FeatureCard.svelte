<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		description: string;
		icon?: Snippet;
	}

	let { title, description, icon }: Props = $props();
</script>

<div
	class="border-border/60 bg-muted/50 hover:border-muted-foreground/60 rounded-xl border p-6 transition-colors"
>
	{#if icon}
		<div class="text-muted-foreground mb-3">
			{@render icon()}
		</div>
	{/if}
	<h3 class="text-foreground text-sm font-semibold">{title}</h3>
	<p class="text-muted-foreground mt-1.5 text-sm leading-relaxed">
		{description}
	</p>
</div>
