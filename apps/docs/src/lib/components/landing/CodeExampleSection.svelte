<script lang="ts">
	import { BRAND_COLORS } from '$lib/constants';
	import SectionHeader from './SectionHeader.svelte';
</script>

<section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
	<SectionHeader>
		{#snippet title()}
			Drop-in simple
		{/snippet}
		{#snippet description()}
			Replace <code class="text-foreground font-mono">bg-linear-to-r</code>
			with
			<code class="text-foreground font-mono">bg-ease-in-out-to-r</code>
			. Done.
		{/snippet}
	</SectionHeader>
	<div class="grid items-stretch gap-6 lg:grid-cols-2">
		<div class="border-border bg-muted/50 overflow-hidden rounded-xl border">
			<div class="border-border/60 flex items-center gap-2 border-b px-4 py-3">
				<div class="flex gap-1.5">
					<div class="bg-muted-foreground/50 size-3 rounded-full"></div>
					<div class="bg-muted-foreground/50 size-3 rounded-full"></div>
					<div class="bg-muted-foreground/50 size-3 rounded-full"></div>
				</div>
				<span class="text-muted-foreground ml-2 font-mono text-xs">
					index.html
				</span>
			</div>
			<div class="overflow-x-auto p-5">
				<pre class="font-mono text-sm leading-relaxed"><code><span
							class="text-muted-foreground">&lt;div</span> <span
							class="text-muted-foreground">class</span>=<span
							class="text-emerald-400">"<span
								class="text-amber-400">bg-ease-in-out-to-r</span> from-indigo-500 to-cyan-500"</span><span
							class="text-muted-foreground">&gt;</span>
  <span class="text-muted-foreground/70">&lt;!-- Smooth gradient --&gt;</span>
<span class="text-muted-foreground">&lt;/div&gt;</span></code></pre>
			</div>
		</div>

		<div
			class="border-border bg-muted/50 flex flex-col overflow-hidden rounded-xl border"
		>
			<div class="border-border/60 flex items-center border-b px-4 py-3">
				<span class="text-muted-foreground text-xs">Preview</span>
			</div>
			<div class="flex min-h-40 flex-1 items-center justify-center p-5">
				<div class="relative w-full">
					<div class="glow absolute inset-0 rounded-xl opacity-50"></div>
					<div
						class="bg-ease-in-out-to-r relative h-32 w-full rounded-xl"
						style="--tw-gradient-from: {BRAND_COLORS.from}; --tw-gradient-to: {BRAND_COLORS.to};"
					></div>
				</div>
			</div>
		</div>
	</div>
</section>
