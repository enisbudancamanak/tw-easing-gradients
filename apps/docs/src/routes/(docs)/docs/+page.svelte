<script lang="ts">
	import { DocPage } from '@svecodocs/kit';
	import CopyLLM from '$lib/components/docs/CopyLLM.svelte';
	let { data } = $props();

	const DocPageAny = DocPage as typeof DocPage & {
		(props: any): any;
	};
</script>

<DocPageAny component={data.component} {...data.metadata}>
	{#snippet headerActions()}
		<CopyLLM />
	{/snippet}
</DocPageAny>
