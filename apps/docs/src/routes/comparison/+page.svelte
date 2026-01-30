<script lang="ts">
	const directions = ['t', 'r', 'b', 'l', 'tl', 'tr', 'bl', 'br'] as const;
	const dirLabels: Record<string, string> = {
		t: 'to-t (top)',
		r: 'to-r (right)',
		b: 'to-b (bottom)',
		l: 'to-l (left)',
		tl: 'to-tl (top-left)',
		tr: 'to-tr (top-right)',
		bl: 'to-bl (bottom-left)',
		br: 'to-br (bottom-right)'
	};
	const easings = ['ease', 'ease-in', 'ease-out', 'ease-in-out'] as const;

	let selectedEasing = $state<string>('ease');

	function easingClass(easing: string, dir: string) {
		return easing === 'ease' ? `bg-ease-to-${dir}` : `bg-${easing}-to-${dir}`;
	}
</script>

<svelte:head>
	<title>Gradient Comparison | tw-easing-gradients</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 p-6 text-zinc-100 md:p-10">
	<div class="mx-auto max-w-7xl space-y-8">
		<div class="space-y-2">
			<h1 class="text-2xl font-bold tracking-tight">Gradient Comparison</h1>
			<p class="max-w-2xl text-sm text-zinc-400">
				Tailwind linear vs Easing gradient - jeweils mit oklch und Hex Input.
			</p>
		</div>

		<div class="flex gap-2">
			{#each easings as easing}
				<button
					onclick={() => (selectedEasing = easing)}
					class="rounded-md border px-3 py-1.5 text-sm transition-all {selectedEasing ===
					easing
						? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
						: 'border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-zinc-600'}"
				>
					{easing}
				</button>
			{/each}
		</div>

		{#each directions as dir}
			{@const cls = easingClass(selectedEasing, dir)}
			<div class="space-y-3">
				<div class="flex items-baseline gap-3">
					<h2 class="text-sm font-semibold text-zinc-300">{dirLabels[dir]}</h2>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="space-y-1">
						<div class="flex items-center justify-between">
							<span class="font-mono text-xs text-zinc-500">
								bg-linear-to-{dir}
							</span>
							<span class="text-[10px] text-zinc-600">Tailwind</span>
						</div>
						<div
							class="h-32 rounded-lg border border-zinc-800 bg-linear-to-{dir} from-cyan-500"
						></div>
					</div>

					<div class="space-y-1">
						<div class="flex items-center justify-between">
							<span class="font-mono text-xs text-zinc-500">{cls}</span>
							<span class="text-[10px] text-zinc-600">oklch</span>
						</div>
						<div
							class="h-32 rounded-lg border border-zinc-800 {cls} from-cyan-500"
						></div>
					</div>

					<div class="space-y-1">
						<div class="flex items-center justify-between">
							<span class="font-mono text-xs text-zinc-500">{cls}</span>
							<span class="text-[10px] text-zinc-600">Hex</span>
						</div>
						<div
							class="h-32 rounded-lg border border-zinc-800 {cls} from-[#00b8db]"
						></div>
					</div>
				</div>
			</div>
		{/each}

		<div class="space-y-6 border-t border-zinc-800 pt-8">
			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Mit to-color</h2>
				<p class="text-sm text-zinc-400">
					Vergleich mit explizitem <code class="text-cyan-400">
						to-indigo-500
					</code>
				</p>
			</div>

			{#each ['r', 'b'] as dir}
				{@const cls = easingClass(selectedEasing, dir)}
				<div class="space-y-3">
					<h3 class="text-sm font-semibold text-zinc-300">{dirLabels[dir]}</h3>
					<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div class="space-y-1">
							<span class="font-mono text-xs text-zinc-500">
								bg-linear-to-{dir}
							</span>
							<div
								class="h-32 rounded-lg border border-zinc-800 bg-linear-to-{dir} from-cyan-500 to-indigo-500"
							></div>
						</div>
						<div class="space-y-1">
							<span class="font-mono text-xs text-zinc-500">{cls} (oklch)</span>
							<div
								class="h-32 rounded-lg border border-zinc-800 {cls} from-cyan-500 to-indigo-500"
							></div>
						</div>
						<div class="space-y-1">
							<span class="font-mono text-xs text-zinc-500">{cls} (Hex)</span>
							<div
								class="h-32 rounded-lg border border-zinc-800 {cls} from-[#00b8db] to-[#6366f1]"
							></div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Tailwind v4 Interpolation Modes Test -->
		<div class="space-y-6 border-t border-zinc-800 pt-8">
			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Tailwind v4 Interpolation Modes</h2>
				<p class="text-sm text-zinc-400">
					Test: <code class="text-cyan-400">/oklch</code>
					vs
					<code class="text-cyan-400">/srgb</code>
					 vs default
				</p>
			</div>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<div class="space-y-1">
					<span class="font-mono text-xs text-zinc-500">
						bg-linear-to-r (default)
					</span>
					<div
						class="h-32 rounded-lg border border-zinc-800 bg-linear-to-r from-indigo-500 to-teal-400"
					></div>
				</div>
				<div class="space-y-1">
					<span class="font-mono text-xs text-zinc-500">
						bg-linear-to-r/oklch
					</span>
					<div
						class="h-32 rounded-lg border border-zinc-800 bg-linear-to-r/oklch from-indigo-500 to-teal-400"
					></div>
				</div>
				<div class="space-y-1">
					<span class="font-mono text-xs text-zinc-500">
						bg-linear-to-r/srgb
					</span>
					<div
						class="h-32 rounded-lg border border-zinc-800 bg-linear-to-r/srgb from-indigo-500 to-teal-400"
					></div>
				</div>
			</div>
		</div>

		<div class="border-t border-zinc-800 pt-6 text-xs text-zinc-600">
			<p>Plugin: tw-easing-gradients | color-mix(in oklch)</p>
		</div>
	</div>
</div>
