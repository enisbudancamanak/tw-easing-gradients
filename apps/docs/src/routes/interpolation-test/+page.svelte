<script lang="ts">
	import { getCoordinates } from 'tw-easing-gradients';

	type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

	const easings: EasingFunction[] = [
		'ease',
		'ease-in',
		'ease-out',
		'ease-in-out'
	];
	const directions = ['r', 'b', 'br'] as const;
	const dirLabels: Record<string, string> = {
		r: 'to right',
		b: 'to bottom',
		br: 'to bottom right'
	};

	let selectedEasing = $state<EasingFunction>('ease-in-out');
	let fromColor = $state('#00b8db');
	let toColor = $state('#6366f1');
	let stops = $state(16);

	// Generate OLD gradient (relative color syntax)
	function generateOldGradient(easing: EasingFunction, dir: string): string {
		const coords = getCoordinates(easing, stops);
		const fullDir = dirLabels[dir];

		const gradientStops = coords
			.map(({ x, y }) => {
				const position = Math.round(x * 1000) / 10;
				const percentage = Math.round(y * 1000) / 10;

				if (percentage === 0) {
					return `var(--from-color) ${position}%`;
				}
				if (percentage === 100) {
					return `oklch(from var(--to-color, oklch(from var(--from-color) l c h / 0)) l c h / alpha) ${position}%`;
				}
				return `oklch(from color-mix(in oklch, var(--to-color, oklch(from var(--from-color) l c h / 0)) ${percentage}%, var(--from-color)) l c h / alpha) ${position}%`;
			})
			.join(', ');

		return `linear-gradient(${fullDir}, ${gradientStops})`;
	}

	// Generate NEW gradient (color-mix oklch)
	function generateNewGradient(easing: EasingFunction, dir: string): string {
		const coords = getCoordinates(easing, stops);
		const fullDir = dirLabels[dir];

		const gradientStops = coords
			.map(({ x, y }) => {
				const position = (x * 100).toFixed(2);
				const mix = Math.round(y * 100);
				return `color-mix(in oklch, var(--from-color), var(--to-color, transparent) ${mix}%) ${position}%`;
			})
			.join(', ');

		return `linear-gradient(${fullDir}, ${gradientStops})`;
	}

	// Generate HSL gradient (color-mix hsl)
	function generateHslGradient(easing: EasingFunction, dir: string): string {
		const coords = getCoordinates(easing, stops);
		const fullDir = dirLabels[dir];

		const gradientStops = coords
			.map(({ x, y }) => {
				const position = (x * 100).toFixed(2);
				const mix = Math.round(y * 100);
				return `color-mix(in hsl, var(--from-color), var(--to-color, transparent) ${mix}%) ${position}%`;
			})
			.join(', ');

		return `linear-gradient(${fullDir}, ${gradientStops})`;
	}

	// Generate HSL relative color syntax gradient
	function generateHslRelativeGradient(
		easing: EasingFunction,
		dir: string
	): string {
		const coords = getCoordinates(easing, stops);
		const fullDir = dirLabels[dir];

		const gradientStops = coords
			.map(({ x, y }) => {
				const position = Math.round(x * 1000) / 10;
				const percentage = Math.round(y * 1000) / 10;

				if (percentage === 0) {
					return `var(--from-color) ${position}%`;
				}
				if (percentage === 100) {
					return `hsl(from var(--to-color, hsl(from var(--from-color) h s l / 0)) h s l / alpha) ${position}%`;
				}
				return `hsl(from color-mix(in hsl, var(--to-color, hsl(from var(--from-color) h s l / 0)) ${percentage}%, var(--from-color)) h s l / alpha) ${position}%`;
			})
			.join(', ');

		return `linear-gradient(${fullDir}, ${gradientStops})`;
	}
</script>

<svelte:head>
	<title>Color Interpolation Test | tw-easing-gradients</title>
</svelte:head>

<div class="min-h-screen bg-zinc-950 p-6 text-zinc-100 md:p-10">
	<div class="mx-auto max-w-7xl space-y-8">
		<div class="space-y-2">
			<h1 class="text-2xl font-bold tracking-tight">
				Color Interpolation Test
			</h1>
			<p class="max-w-2xl text-sm text-zinc-400">
				Vergleich: <strong class="text-amber-400">oklch relative</strong>
				vs
				<strong class="text-emerald-400">oklch</strong>
				vs
				<strong class="text-pink-400">hsl</strong>
				vs
				<strong class="text-violet-400">hsl relative</strong>
			</p>
		</div>

		<div class="flex flex-wrap items-end gap-6">
			<div class="flex gap-2">
				{#each easings as easing (easing)}
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

			<div class="flex items-center gap-4">
				<label class="flex items-center gap-2">
					<span class="text-xs text-zinc-500">From:</span>
					<input
						type="color"
						bind:value={fromColor}
						class="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-zinc-900"
					/>
					<span class="font-mono text-xs text-zinc-400">{fromColor}</span>
				</label>
				<label class="flex items-center gap-2">
					<span class="text-xs text-zinc-500">To:</span>
					<input
						type="color"
						bind:value={toColor}
						class="h-8 w-8 cursor-pointer rounded border border-zinc-700 bg-zinc-900"
					/>
					<span class="font-mono text-xs text-zinc-400">{toColor}</span>
				</label>
			</div>

			<label class="flex items-center gap-2">
				<span class="text-xs text-zinc-500">Stops:</span>
				<input type="range" min="5" max="30" bind:value={stops} class="w-24" />
				<span class="font-mono text-xs text-zinc-400">{stops}</span>
			</label>
		</div>

		<div
			class="contents"
			style="--from-color: {fromColor}; --to-color: {toColor};"
		>
			{#each directions as dir (dir)}
				<div class="space-y-3">
					<h2 class="text-sm font-semibold text-zinc-300">{dirLabels[dir]}</h2>

					<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div class="space-y-1">
							<span class="font-mono text-xs text-amber-400">
								oklch relative
							</span>
							<div
								class="h-40 rounded-lg border border-zinc-800"
								style="background-image: {generateOldGradient(
									selectedEasing,
									dir
								)};"
							></div>
						</div>

						<div class="space-y-1">
							<span class="font-mono text-xs text-emerald-400">oklch</span>
							<div
								class="h-40 rounded-lg border border-zinc-800"
								style="background-image: {generateNewGradient(
									selectedEasing,
									dir
								)};"
							></div>
						</div>

						<div class="space-y-1">
							<span class="font-mono text-xs text-pink-400">hsl</span>
							<div
								class="h-40 rounded-lg border border-zinc-800"
								style="background-image: {generateHslGradient(
									selectedEasing,
									dir
								)};"
							></div>
						</div>

						<div class="space-y-1">
							<span class="font-mono text-xs text-violet-400">
								hsl relative
							</span>
							<div
								class="h-40 rounded-lg border border-zinc-800"
								style="background-image: {generateHslRelativeGradient(
									selectedEasing,
									dir
								)};"
							></div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div class="space-y-6 border-t border-zinc-800 pt-8">
			<div class="space-y-2">
				<h2 class="text-lg font-semibold">Transparency Fade Test</h2>
				<p class="text-sm text-zinc-400">
					Ohne <code class="text-cyan-400">to-color</code>
					 - fade zu transparent
				</p>
			</div>

			<div class="contents" style="--from-color: {fromColor};">
				{#each ['r', 'b'] as dir (dir)}
					<div class="space-y-3">
						<h3 class="text-sm font-semibold text-zinc-300">
							{dirLabels[dir]}
						</h3>
						<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
							<div class="space-y-1">
								<span class="font-mono text-xs text-amber-400">
									oklch relative
								</span>
								<div
									class="h-32 rounded-lg border border-zinc-800"
									style="background-image: {generateOldGradient(
										selectedEasing,
										dir
									)};"
								></div>
							</div>
							<div class="space-y-1">
								<span class="font-mono text-xs text-emerald-400">oklch</span>
								<div
									class="h-32 rounded-lg border border-zinc-800"
									style="background-image: {generateNewGradient(
										selectedEasing,
										dir
									)};"
								></div>
							</div>
							<div class="space-y-1">
								<span class="font-mono text-xs text-pink-400">hsl</span>
								<div
									class="h-32 rounded-lg border border-zinc-800"
									style="background-image: {generateHslGradient(
										selectedEasing,
										dir
									)};"
								></div>
							</div>
							<div class="space-y-1">
								<span class="font-mono text-xs text-violet-400">
									hsl relative
								</span>
								<div
									class="h-32 rounded-lg border border-zinc-800"
									style="background-image: {generateHslRelativeGradient(
										selectedEasing,
										dir
									)};"
								></div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="space-y-4 border-t border-zinc-800 pt-6">
			<h2 class="text-lg font-semibold">Generated CSS</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div class="space-y-2">
					<span class="font-mono text-xs text-amber-400">oklch relative</span>
					<pre
						class="max-h-48 overflow-x-auto overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-[10px]">{generateOldGradient(
							selectedEasing,
							'r'
						)}</pre>
				</div>
				<div class="space-y-2">
					<span class="font-mono text-xs text-emerald-400">oklch</span>
					<pre
						class="max-h-48 overflow-x-auto overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-[10px]">{generateNewGradient(
							selectedEasing,
							'r'
						)}</pre>
				</div>
				<div class="space-y-2">
					<span class="font-mono text-xs text-pink-400">hsl</span>
					<pre
						class="max-h-48 overflow-x-auto overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-[10px]">{generateHslGradient(
							selectedEasing,
							'r'
						)}</pre>
				</div>
				<div class="space-y-2">
					<span class="font-mono text-xs text-violet-400">hsl relative</span>
					<pre
						class="max-h-48 overflow-x-auto overflow-y-auto rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-[10px]">{generateHslRelativeGradient(
							selectedEasing,
							'r'
						)}</pre>
				</div>
			</div>
		</div>

		<div class="border-t border-zinc-800 pt-6 text-xs text-zinc-600">
			<p>
				oklch relative: oklch(from color-mix(in oklch...)) | oklch: color-mix(in
				oklch) | hsl: color-mix(in hsl) | hsl relative: hsl(from color-mix(in
				hsl...))
			</p>
		</div>
	</div>
</div>
