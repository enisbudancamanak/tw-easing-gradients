<script lang="ts">
	import Star from 'phosphor-svelte/lib/Star';
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import { Button } from '@svecodocs/kit';

	interface Props {
		repo?: string;
		stars?: number | null;
		class?: string;
	}

	let {
		repo = 'enisbudancamanak/tw-easing-gradients',
		stars = null,
		class: className = ''
	}: Props = $props();
</script>

<Button
	variant="subtle"
	href="https://github.com/{repo}"
	target="_blank"
	rel="noopener noreferrer"
>
	<GithubIcon class="size-4" />
	<span>Star on GitHub</span>
	{#if stars !== null}
		<span
			class="border-muted-foreground/50 text-muted-foreground group-hover:text-foreground flex items-center gap-1 border-l pl-2"
		>
			<Star class="size-3.5" weight="fill" />
			<span class="tabular-nums">{stars}</span>
		</span>
	{/if}
</Button>
