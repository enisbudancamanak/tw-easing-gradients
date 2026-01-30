<script lang="ts">
	import GithubIcon from '$lib/components/icons/GithubIcon.svelte';
	import Logo from '$lib/components/logos/Logo.svelte';

	interface Props {
		activeRoute?: string;
	}

	let { activeRoute = '' }: Props = $props();
</script>

<header
	class="border-border/50 bg-background-secondary/80 sticky top-0 z-50 border-b backdrop-blur-xl"
>
	<div
		class="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6"
	>
		<a href="/" class="flex items-center">
			<Logo variant="dark" class="h-5 w-auto" />
		</a>
		<nav class="flex items-center gap-1">
			<a
				href="/docs"
				class="rounded-md px-3 py-1.5 text-sm transition-colors {activeRoute ===
				'docs'
					? 'text-white'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				Docs
			</a>
			<a
				href="/playground"
				class="rounded-md px-3 py-1.5 text-sm transition-colors {activeRoute ===
				'playground'
					? 'text-white'
					: 'text-muted-foreground hover:text-foreground'}"
			>
				Playground
			</a>
			<a
				href="https://github.com/enisbudancamanak/tw-easing-gradients"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground hover:text-foreground ml-2 rounded-md p-2 transition-colors"
				aria-label="GitHub"
			>
				<GithubIcon class="size-5" />
			</a>
		</nav>
	</div>
</header>
