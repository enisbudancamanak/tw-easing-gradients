<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		type?: 'info' | 'warning' | 'error';
		children: Snippet;
	}

	let { type = 'info', children }: Props = $props();

	const styles = {
		info: 'border-blue-500/50 bg-blue-500/10 text-blue-200',
		warning: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-200',
		error: 'border-red-500/50 bg-red-500/10 text-red-200'
	};

	const icons = {
		info: 'ℹ️',
		warning: '⚠️',
		error: '❌'
	};
</script>

<div class="not-prose my-4 rounded-lg border-l-4 p-4 {styles[type]}">
	<span class="mr-2">{icons[type]}</span>
	{@render children()}
</div>
