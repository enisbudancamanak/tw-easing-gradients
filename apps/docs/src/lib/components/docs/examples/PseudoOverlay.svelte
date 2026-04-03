<script lang="ts">
	interface Props {
		variant?: 'brand' | 'black';
	}

	let { variant = 'brand' }: Props = $props();
</script>

<div class="not-prose @container isolate my-8">
	<div class="grid grid-cols-1 gap-2 sm:gap-4 @sm:grid-cols-2">
		<!-- Linear (banding visible) -->
		<div class="relative">
			{#if variant === 'brand'}
				<div
					class="ring-border relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1"
				>
					<div class="from-brand pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-linear-to-b to-transparent"></div>
					<div class="from-brand pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t to-transparent"></div>
					<span class="text-brand relative z-20 font-medium">tailwind</span>
				</div>
			{:else}
				<div
					class="ring-border relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1"
				>
					<div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-linear-to-b from-black to-transparent"></div>
					<div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t from-black to-transparent"></div>
					<span class="relative z-20 font-medium text-black">tailwind</span>
				</div>
			{/if}
		</div>

		<!-- Eased (smooth) -->
		<div class="relative">
			{#if variant === 'brand'}
				<div
					class="ring-brand relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1"
				>
					<div class="from-brand pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-ease-in-out-to-b to-transparent"></div>
					<div class="from-brand pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-ease-in-out-to-t to-transparent"></div>
					<span class="text-brand relative z-20 font-medium">
						tw-easing-gradients
					</span>
				</div>
			{:else}
				<div
					class="ring-border relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1"
				>
					<div class="pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-ease-to-b from-black to-transparent"></div>
					<div class="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-ease-to-t from-black to-transparent"></div>
					<span class="relative z-20 font-medium text-black">
						tw-easing-gradients
					</span>
				</div>
			{/if}
		</div>
	</div>
</div>
