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
					class="ring-border before:from-brand after:from-brand relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1/3 before:bg-linear-to-b before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-1/3 after:bg-linear-to-t after:to-transparent after:content-['']"
				>
					<span class="text-brand relative z-20 font-medium">tailwind</span>
				</div>
			{:else}
				<div
					class="ring-border relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1/3 before:bg-linear-to-b before:from-black before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-1/3 after:bg-linear-to-t after:from-black after:to-transparent after:content-['']"
				>
					<span class="relative z-20 font-medium text-black">tailwind</span>
				</div>
			{/if}
		</div>

		<!-- Eased (smooth) -->
		<div class="relative">
			{#if variant === 'brand'}
				<div
					class="ring-brand before:bg-ease-in-out-to-b after:bg-ease-in-out-to-t before:from-brand after:from-brand relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1/3 before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-1/3 after:to-transparent after:content-['']"
				>
					<span class="text-brand relative z-20 font-medium">
						tw-easing-gradients
					</span>
				</div>
			{:else}
				<div
					class="ring-border before:bg-ease-to-b after:bg-ease-to-t relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1/3 before:from-black before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-1/3 after:from-black after:to-transparent after:content-['']"
				>
					<span class="relative z-20 font-medium text-black">
						tw-easing-gradients
					</span>
				</div>
			{/if}
		</div>
	</div>
</div>
