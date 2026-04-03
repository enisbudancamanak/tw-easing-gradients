<script lang="ts">
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import Copy from 'phosphor-svelte/lib/Copy';
	import X from 'phosphor-svelte/lib/X';
	import { scale } from 'svelte/transition';

	const PKG = 'tw-easing-gradients';

	const managers = [
		{ label: 'pnpm', verb: 'add' },
		{ label: 'npm', verb: 'install' },
		{ label: 'yarn', verb: 'add' },
		{ label: 'bun', verb: 'add' }
	];

	let active = $state(0);
	let pm = $derived(managers[active]);
	let currentCommand = $derived(`${pm.label} ${pm.verb} ${PKG}`);

	const clipboard = new UseClipboard();
</script>

<div class="flex flex-col items-center gap-2">
	<div class="flex gap-1">
		{#each managers as pm, i (pm.label)}
			<button
				onclick={() => (active = i)}
				class="rounded-md px-2.5 py-1 text-xs font-medium transition-colors {active === i
					? 'bg-foreground/15 text-foreground'
					: 'text-muted-foreground/70 hover:text-muted-foreground'}"
			>
				{pm.label}
			</button>
		{/each}
	</div>

	<button
		onclick={() => clipboard.copy(currentCommand)}
		class="group border-border bg-foreground/10 text-muted-foreground hover:bg-foreground/15 flex items-center gap-3 rounded-lg border px-5 py-3 font-mono text-sm transition-colors"
	>
		<span class="text-muted-foreground/70">$</span>
		<span>
			<span class="text-foreground">{pm.label} {pm.verb}</span>
			<span class="bg-foreground/10 rounded px-1.5 whitespace-nowrap">{PKG}</span>
		</span>
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
</div>
