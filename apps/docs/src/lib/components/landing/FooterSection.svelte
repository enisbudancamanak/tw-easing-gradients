<script lang="ts">
	interface Props {
		repo?: string;
	}

	let { repo = 'enisbudancamanak/tw-easing-gradients' }: Props = $props();
</script>

<footer class="border-border border-t py-8">
	<div
		class="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6"
	>
		<span class="text-muted-foreground font-mono text-sm">
			tw-easing-gradients
		</span>
		<p class="text-muted-foreground text-xs">
			Open Source &middot;
			<a
				href="https://github.com/{repo}"
				class="hover:text-foreground underline underline-offset-4 transition-colors"
			>
				GitHub
			</a>
		</p>
	</div>
</footer>
