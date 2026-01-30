<script lang="ts">
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import Copy from 'phosphor-svelte/lib/Copy';
	import X from 'phosphor-svelte/lib/X';
	import { scale } from 'svelte/transition';

	interface Props {
		command?: string;
	}

	let { command = 'npm install tw-easing-gradients' }: Props = $props();

	const clipboard = new UseClipboard();
</script>

<button
	onclick={() => clipboard.copy(command)}
	class="group border-border bg-foreground/10 text-muted-foreground hover:bg-foreground/15 flex items-center gap-3 rounded-lg border px-5 py-3 font-mono text-sm transition-colors"
>
	<span class="text-muted-foreground/70">$</span>
	<span class="whitespace-nowrap">{command}</span>
	{#if clipboard.status === 'success'}
		<div in:scale={{ duration: 150, start: 0.85 }}>
			<Check class="size-4 text-emerald-400" />
		</div>
	{:else if clipboard.status === 'failure'}
		<div in:scale={{ duration: 150, start: 0.85 }}>
			<X class="size-4 text-red-400" />
		</div>
	{:else}
		<div in:scale={{ duration: 150, start: 0.85 }}>
			<Copy
				class="text-muted-foreground/70 group-hover:text-muted-foreground size-4 transition-colors"
			/>
		</div>
	{/if}
</button>
