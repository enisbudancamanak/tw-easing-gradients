<script lang="ts">
	interface Props {
		label: string;
		gradientClass: string;
		from?: string;
		to?: string;
		fromClass?: string;
		toClass?: string;
	}

	let { label, gradientClass, from, to, fromClass, toClass }: Props = $props();

	const useStyleVars = $derived(from && to && !fromClass && !toClass);
</script>

<div class="flex flex-col items-center gap-2">
	{#if useStyleVars}
		<div
			class="h-24 w-full rounded-lg {gradientClass}"
			style="--tw-gradient-from: {from}; --tw-gradient-to: {to}; --tw-gradient-stops: {from}, {to};"
		></div>
	{:else}
		<div
			class="h-24 w-full rounded-lg {gradientClass} {fromClass} {toClass}"
		></div>
	{/if}
	<span class="text-muted-foreground font-mono text-xs">{label}</span>
</div>
