<script lang="ts">
	import { Button } from '@svecodocs/kit';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import Copy from 'phosphor-svelte/lib/Copy';
	import X from 'phosphor-svelte/lib/X';
	import { scale } from 'svelte/transition';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof Button> & {
		text: string;
		onCopy?: (status: 'success' | 'failure') => void;
	};

	let {
		text,
		onCopy,
		variant = 'ghost',
		size = 'sm',
		class: className,
		...rest
	}: Props = $props();

	const clipboard = new UseClipboard();
</script>

<Button
	{...rest}
	{variant}
	{size}
	class="h-7 text-xs {className}"
	onclick={async () => {
		const status = await clipboard.copy(text);
		onCopy?.(status);
	}}
>
	{#if clipboard.status === 'success'}
		<span class="flex items-center" in:scale={{ duration: 150, start: 0.85 }}>
			<Check class="mr-1 size-3.5" />
			Copied!
		</span>
	{:else if clipboard.status === 'failure'}
		<span class="flex items-center" in:scale={{ duration: 150, start: 0.85 }}>
			<X class="mr-1 size-3.5" />
			Failed
		</span>
	{:else}
		<span class="flex items-center" in:scale={{ duration: 150, start: 0.85 }}>
			<Copy class="mr-1 size-3.5" />
			Copy
		</span>
	{/if}
</Button>
