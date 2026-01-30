<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/caveat/700.css';

	import { siteConfig } from '$lib/site-config';
	import { useSiteConfig } from '@svecodocs/kit';

	let { children } = $props();

	useSiteConfig(() => siteConfig);
</script>

{@render children?.()}
