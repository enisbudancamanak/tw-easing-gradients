<script lang="ts">
	import { Label, Separator, Select } from '@svecodocs/kit';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';
	import CopyButton from '$lib/components/CopyButton.svelte';
	import { BRAND_COLORS } from '$lib/constants';
	import ArrowUp from 'phosphor-svelte/lib/ArrowUp';
	import ArrowDown from 'phosphor-svelte/lib/ArrowDown';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import ArrowUpLeft from 'phosphor-svelte/lib/ArrowUpLeft';
	import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
	import ArrowDownLeft from 'phosphor-svelte/lib/ArrowDownLeft';
	import ArrowDownRight from 'phosphor-svelte/lib/ArrowDownRight';

	let fromHex = $state(BRAND_COLORS.from);
	let toHex = $state(BRAND_COLORS.to);
	let easing = $state('ease-in-out');
	let direction = $state('r');

	function hexToArbitrary(hex: string): string {
		if (hex.length === 9) {
			const color = hex.slice(0, 7);
			const alpha = Math.round((parseInt(hex.slice(7, 9), 16) / 255) * 100);
			if (alpha === 100) return `[${color}]`;
			return `[${color}/${alpha}]`;
		}
		return `[${hex}]`;
	}

	let fromColor = $derived(hexToArbitrary(fromHex));
	let toColor = $derived(hexToArbitrary(toHex));

	const easingCurves: Record<string, [number, number, number, number]> = {
		ease: [0.25, 0.1, 0.25, 1],
		'ease-in': [0.42, 0, 1, 1],
		'ease-out': [0, 0, 0.58, 1],
		'ease-in-out': [0.42, 0, 0.58, 1]
	};

	let currentCurve = $derived(easingCurves[easing]);

	let curvePath = $derived.by(() => {
		const [x1, y1, x2, y2] = currentCurve;
		const w = 120,
			h = 70,
			pad = 12;
		const sx = pad,
			sy = h - pad,
			ex = w - pad,
			ey = pad;
		return `M ${sx} ${sy} C ${sx + x1 * (ex - sx)} ${sy - y1 * (sy - ey)}, ${sx + x2 * (ex - sx)} ${sy - y2 * (sy - ey)}, ${ex} ${ey}`;
	});

	let className = $derived(
		easing === 'ease'
			? `bg-ease-to-${direction}`
			: `bg-${easing}-to-${direction}`
	);

	let fullClass = $derived(`${className} from-${fromColor} to-${toColor}`);

	const easings = [
		{ value: 'ease', label: 'Ease' },
		{ value: 'ease-in', label: 'Ease In' },
		{ value: 'ease-out', label: 'Ease Out' },
		{ value: 'ease-in-out', label: 'Ease In Out' }
	];

	let easingLabel = $derived(
		easings.find((e) => e.value === easing)?.label ?? 'Select easing'
	);

	const directionIcons = {
		t: ArrowUp,
		r: ArrowRight,
		b: ArrowDown,
		l: ArrowLeft,
		tl: ArrowUpLeft,
		tr: ArrowUpRight,
		bl: ArrowDownLeft,
		br: ArrowDownRight
	};

	const directions = [
		{ value: 't', label: 'Top' },
		{ value: 'r', label: 'Right' },
		{ value: 'b', label: 'Bottom' },
		{ value: 'l', label: 'Left' },
		{ value: 'tl', label: 'Top Left' },
		{ value: 'tr', label: 'Top Right' },
		{ value: 'bl', label: 'Bottom Left' },
		{ value: 'br', label: 'Bottom Right' }
	];

	const presets = [
		{
			from: 'indigo-500',
			to: 'cyan-500',
			fromHex: BRAND_COLORS.from,
			toHex: BRAND_COLORS.to,
			label: 'Indigo → Cyan'
		},
		{
			from: 'violet-500',
			to: 'pink-500',
			fromHex: '#8b5cf6',
			toHex: '#ec4899',
			label: 'Violet → Pink'
		},
		{
			from: 'emerald-500',
			to: 'blue-500',
			fromHex: '#10b981',
			toHex: '#3b82f6',
			label: 'Emerald → Blue'
		},
		{
			from: 'amber-500',
			to: 'red-500',
			fromHex: '#f59e0b',
			toHex: '#ef4444',
			label: 'Amber → Red'
		},
		{
			from: 'black',
			to: 'white',
			fromHex: '#000000',
			toHex: '#ffffff',
			label: 'Black → White'
		},
		{
			from: 'rose-500',
			to: 'orange-400',
			fromHex: '#f43f5e',
			toHex: '#fb923c',
			label: 'Rose → Orange'
		}
	];
</script>

<svelte:head>
	<title>Playground | tw-easing-gradients</title>
</svelte:head>

<div class="mx-auto w-full max-w-[640px] space-y-6 2xl:max-w-[760px]">
	<!-- Page Header -->
	<div>
		<h1 class="scroll-m-20 text-[30px] font-semibold">Playground</h1>
		<p
			class="text-muted-foreground mt-3 text-[18px] leading-7 tracking-[-0.01em] text-balance"
		>
			Build and preview easing gradients interactively.
		</p>
		<Separator class="mt-6" />
	</div>

	<!-- Preview -->
	<div
		class="border-border relative h-48 w-full rounded-xl border shadow-2xl sm:h-64 {className}"
		style="--tw-gradient-from: {fromHex}; --tw-gradient-to: {toHex};"
	>
		<div class="absolute inset-0 flex items-end p-4">
			<code
				class="rounded bg-black/20 px-2 py-1 font-mono text-sm text-white/60 backdrop-blur-sm"
			>
				{className}
			</code>
		</div>
	</div>

	<!-- Controls: Colors left, Options right -->
	<div class="grid gap-6 sm:grid-cols-2">
		<!-- Colors -->
		<div class="border-border bg-card space-y-4 rounded-xl border p-5">
			<h3 class="text-foreground text-sm font-semibold">Colors</h3>

			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<Label class="text-muted-foreground text-xs tracking-wider uppercase">
						From
					</Label>
					<code class="text-muted-foreground font-mono text-xs">{fromHex}</code>
				</div>
				<div class="color-picker-wrapper">
					<ColorPicker
						bind:hex={fromHex}
						components={ChromeVariant}
						sliderDirection="horizontal"
						isAlpha
						--picker-width="100%"
						--picker-height="100px"
					/>
				</div>
			</div>

			<Separator />

			<div class="space-y-3">
				<div class="flex items-center justify-between">
					<Label class="text-muted-foreground text-xs tracking-wider uppercase">
						To
					</Label>
					<code class="text-muted-foreground font-mono text-xs">{toHex}</code>
				</div>
				<div class="color-picker-wrapper">
					<ColorPicker
						bind:hex={toHex}
						components={ChromeVariant}
						sliderDirection="horizontal"
						isAlpha
						--picker-width="100%"
						--picker-height="100px"
					/>
				</div>
			</div>

			<Separator />

			<div class="space-y-2">
				<Label class="text-muted-foreground text-xs tracking-wider uppercase">
					Presets
				</Label>
				<div class="grid grid-cols-2 gap-1.5">
					{#each presets as preset (preset.label)}
						<button
							onclick={() => {
								fromHex = preset.fromHex;
								toHex = preset.toHex;
							}}
							class="group border-border hover:bg-accent flex items-center gap-2 rounded-lg border p-1.5 transition-all"
						>
							<div
								class="ring-border/50 h-6 w-6 shrink-0 rounded ring-1 ring-inset"
								style="background: linear-gradient(135deg, {preset.fromHex}, {preset.toHex});"
							></div>
							<span
								class="text-muted-foreground group-hover:text-foreground truncate text-[11px] transition-colors"
							>
								{preset.label}
							</span>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Easing & Direction -->
		<div class="border-border bg-card space-y-4 rounded-xl border p-5">
			<h3 class="text-foreground text-sm font-semibold">Options</h3>

			<div class="space-y-2">
				<Label class="text-muted-foreground text-xs tracking-wider uppercase">
					Easing
				</Label>
				<Select.Root type="single" bind:value={easing}>
					<Select.Trigger class="h-9 w-full">
						{easingLabel}
					</Select.Trigger>
					<Select.Content side="top">
						{#each easings as e (e.value)}
							<Select.Item value={e.value} label={e.label}>
								{e.label}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>

				<div
					class="border-border bg-muted/30 flex justify-center rounded-lg border p-2"
				>
					<svg
						width="120"
						height="70"
						viewBox="0 0 120 70"
						class="text-foreground"
					>
						<line
							x1="12"
							y1="58"
							x2="108"
							y2="58"
							stroke="currentColor"
							stroke-opacity="0.1"
							stroke-width="1"
						/>
						<line
							x1="12"
							y1="12"
							x2="108"
							y2="12"
							stroke="currentColor"
							stroke-opacity="0.1"
							stroke-width="1"
						/>
						<line
							x1="12"
							y1="58"
							x2="12"
							y2="12"
							stroke="currentColor"
							stroke-opacity="0.1"
							stroke-width="1"
						/>
						<line
							x1="108"
							y1="58"
							x2="108"
							y2="12"
							stroke="currentColor"
							stroke-opacity="0.1"
							stroke-width="1"
						/>
						<line
							x1="12"
							y1="58"
							x2="108"
							y2="12"
							stroke="currentColor"
							stroke-opacity="0.08"
							stroke-width="1"
							stroke-dasharray="3 3"
						/>
						<path
							d={curvePath}
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							class="transition-all duration-300"
						/>
						<circle cx="12" cy="58" r="2.5" fill="currentColor" opacity="0.4" />
						<circle
							cx="108"
							cy="12"
							r="2.5"
							fill="currentColor"
							opacity="0.4"
						/>
					</svg>
				</div>
			</div>

			<div class="space-y-2">
				<Label class="text-muted-foreground text-xs tracking-wider uppercase">
					Direction
				</Label>
				<div class="grid grid-cols-4 gap-1.5">
					{#each directions as dir (dir.value)}
						{@const Icon =
							directionIcons[dir.value as keyof typeof directionIcons]}
						<button
							onclick={() => (direction = dir.value)}
							class="flex h-9 items-center justify-center rounded-md border transition-all duration-150 will-change-transform {direction ===
							dir.value
								? 'border-brand bg-brand text-brand-foreground scale-105 shadow-sm'
								: 'border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground'}"
							title={dir.label}
						>
							<Icon class="size-4" />
						</button>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Code -->
	<div class="border-border bg-card space-y-4 rounded-xl border p-5">
		<div class="flex items-center justify-between">
			<h3 class="text-foreground text-sm font-semibold">Code</h3>
			<CopyButton text={fullClass} />
		</div>

		<div class="bg-background-secondary overflow-hidden rounded-lg p-4">
			<pre
				class="text-muted-foreground overflow-x-auto font-mono text-sm"><code><span
						class="text-brand">{className}</span> from-{fromColor} to-{toColor}</code></pre>
		</div>
	</div>
</div>

<style>
	.color-picker-wrapper {
		--cp-bg-color: var(--theme-color-background);
		--cp-border-color: var(--theme-color-border);
		--cp-text-color: var(--theme-color-foreground);
		--cp-input-color: var(--theme-color-muted);
		--cp-button-hover-color: var(--theme-color-accent);
	}

	.color-picker-wrapper :global(.color-picker) {
		width: 100%;
	}

	.color-picker-wrapper :global(.picker-wrapper) {
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.color-picker-wrapper :global(.container .alpha) {
		display: none;
	}
</style>
