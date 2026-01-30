<script lang="ts">
	interface Props {
		position: number;
		threshold?: number;
	}

	let { position, threshold = 20 }: Props = $props();

	let visible = $derived(position > threshold);
</script>

{#if visible}
	<!-- Mobile: oben -->
	<div
		class="pointer-events-none absolute bottom-1/2 left-[8%] z-20 -translate-y-2 lg:hidden @2xl:hidden"
	>
		<svg
			width="80"
			height="110"
			viewBox="0 0 80 110"
			fill="none"
			class="overflow-visible"
		>
			<text
				x="40"
				y="24"
				text-anchor="middle"
				font-family="'Caveat', cursive"
				font-size="28"
				font-weight="700"
				class="fill-brand"
			>
				Banding!
			</text>
			<path
				d="M 40,30 C 26,42 56,56 38,68 C 22,78 48,84 40,100"
				class="stroke-brand"
				stroke-width="2"
				stroke-linecap="round"
				fill="none"
			/>
			<path
				d="M 33,90 Q 38,96 40,100 Q 46,94 50,86"
				class="stroke-brand"
				stroke-width="2"
				stroke-linecap="round"
				fill="none"
			/>
		</svg>
	</div>

	<!-- Desktop: links -->
	<div
		class="pointer-events-none absolute top-1/2 -left-42.5 z-20 hidden -translate-y-1/2 lg:block @2xl:block"
	>
		<svg
			width="240"
			height="80"
			viewBox="0 0 240 80"
			fill="none"
			class="overflow-visible"
		>
			<text
				x="6"
				y="48"
				font-family="'Caveat', cursive"
				font-size="32"
				font-weight="700"
				class="fill-brand"
			>
				Banding!
			</text>
			<path
				d="M 112,42 C 124,26 132,56 146,36 C 158,18 166,54 180,40 C 190,32 200,44 210,40"
				class="stroke-brand"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
			/>
			<path
				d="M 210,40 L 203,34 M 210,40 L 203,46"
				class="stroke-brand"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				fill="none"
			/>
		</svg>
	</div>
{/if}
