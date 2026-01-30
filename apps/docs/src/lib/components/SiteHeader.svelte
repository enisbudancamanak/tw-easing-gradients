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
		class="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6"
	>
		<a href="/" class="flex items-center">
			<Logo variant="dark" class="h-6 w-auto" />
		</a>
		<nav class="flex items-center">
			<a
				href="/docs"
				class="text-muted-foreground hover:text-foreground px-1.5 text-sm transition-colors sm:px-3"
			>
				Docs
			</a>
			<a
				href="/playground"
				class="text-muted-foreground hover:text-foreground px-1.5 text-sm transition-colors sm:px-3"
			>
				Playground
			</a>
			<a
				href="https://github.com/enisbudancamanak/tw-easing-gradients"
				target="_blank"
				rel="noopener noreferrer"
				class="text-muted-foreground hover:text-foreground p-2 transition-colors"
				aria-label="GitHub"
			>
				<GithubIcon class="size-5" />
			</a>
		</nav>
	</div>
</header>
