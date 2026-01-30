<script lang="ts">
	import { cn } from '$lib/utils';
	import ArrowsOutLineHorizontal from 'phosphor-svelte/lib/ArrowsOutLineHorizontalIcon';
	import LogoIcon from '$lib/components/LogoIcon.svelte';

	interface Props {
		leftLabel?: string;
		rightLabel?: string;
		leftClass: string;
		rightClass: string;
		class?: string;
		position?: number;
	}

	let {
		leftLabel = 'Linear (Tailwind standard)',
		rightLabel = 'Eased (tw-easing-gradients)',
		leftClass,
		rightClass,
		class: className = 'h-[300px]',
		position = $bindable(50)
	}: Props = $props();

	let container: HTMLDivElement;
	let isDragging = $state(false);

	function updatePosition(clientX: number) {
		if (!container) return;
		const rect = container.getBoundingClientRect();
		const x = clientX - rect.left;
		position = Math.max(0, Math.min(100, (x / rect.width) * 100));
	}

	function handlePointerDown(e: PointerEvent) {
		isDragging = true;
		container.setPointerCapture(e.pointerId);
		updatePosition(e.clientX);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		updatePosition(e.clientX);
	}

	function handlePointerUp() {
		isDragging = false;
	}
</script>

<div
	bind:this={container}
	class={cn(
		'border-muted relative cursor-ew-resize touch-none overflow-hidden rounded-xl border select-none',
		className
	)}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointerup={handlePointerUp}
	onpointercancel={handlePointerUp}
	role="slider"
	aria-valuenow={Math.round(position)}
	aria-valuemin={0}
	aria-valuemax={100}
	tabindex="0"
>
	<!-- Logo icon -->
	<div
		class="pointer-events-none absolute inset-0 flex items-center justify-center bg-white"
	>
		<LogoIcon class="size-60" />
	</div>

	<!-- Right overlay (full width, behind) - scrim at bottom -->
	<div
		class={cn(
			'pointer-events-none absolute inset-x-0 bottom-0 h-1/2',
			rightClass
		)}
	></div>

	<!-- Left overlay (clipped) - scrim at bottom -->
	<div
		class={cn(
			'pointer-events-none absolute inset-x-0 bottom-0 h-1/2',
			leftClass
		)}
		style="clip-path: inset(0 {100 - position}% 0 0);"
	></div>

	<!-- Slider handle -->
	<div
		class="pointer-events-none absolute inset-y-0 z-5 flex items-center"
		style="left: {position}%;"
	>
		<div class="relative h-full w-0.5 bg-white shadow-lg">
			<!-- Handle knob -->
			<div
				class="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
			>
				<ArrowsOutLineHorizontal
					class="text-muted-foreground size-5"
					weight="bold"
				/>
			</div>
		</div>
	</div>

	<!-- Labels -->
	<div
		class="absolute bottom-3 left-3 max-w-[45%] text-xs font-medium tracking-wide text-balance text-white uppercase"
	>
		{leftLabel}
	</div>
	<div
		class="absolute right-3 bottom-3 max-w-[45%] text-right text-xs font-medium tracking-wide text-balance text-white uppercase"
	>
		{rightLabel}
	</div>
</div>
