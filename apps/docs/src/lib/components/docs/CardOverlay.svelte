<script lang="ts">
	import oceanImage from '$lib/assets/ocean-waves.jpg?enhanced';
</script>

<div class="not-prose my-8">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		<div class="relative">
			<div class="mb-3 flex items-center gap-2">
				<code
					class="bg-muted text-muted-foreground rounded px-2 py-1 font-mono text-xs"
				>
					bg-linear-to-t
				</code>
				<span class="text-muted-foreground text-sm">Tailwind Standard</span>
			</div>
			<div
				class="ring-border relative aspect-4/3 overflow-hidden rounded-xl ring-1"
			>
				<enhanced:img
					src={oceanImage}
					alt=""
					class="absolute inset-0 size-full object-cover"
					sizes="(min-width: 768px) 360px, 100vw"
				/>
				<div
					class="absolute inset-0 bg-linear-to-t from-black to-transparent"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-4 text-white">
					<h3 class="text-lg font-semibold">Featured Content</h3>
					<p class="text-sm text-white/70">
						Notice how the gradient stays solid and abrupt.
					</p>
				</div>
			</div>
		</div>

		<div class="relative">
			<div class="mb-3 flex items-center gap-2">
				<code
					class="bg-brand/20 text-brand rounded px-2 py-1 font-mono text-xs"
				>
					bg-ease-to-t
				</code>
				<span class="text-brand text-sm">tw-easing-gradients</span>
			</div>
			<div
				class="ring-brand/30 relative aspect-4/3 overflow-hidden rounded-xl ring-1"
			>
				<enhanced:img
					src={oceanImage}
					alt=""
					class="absolute inset-0 size-full object-cover"
					sizes="(min-width: 768px) 360px, 100vw"
				/>
				<div
					class="bg-ease-to-t absolute inset-0 from-black to-transparent"
				></div>
				<div class="absolute inset-x-0 bottom-0 p-4 text-white">
					<h3 class="text-lg font-semibold">Featured Content</h3>
					<p class="text-sm text-white/70">
						Smooth. Natural. Like it should be.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
