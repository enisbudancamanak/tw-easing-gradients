<div class="not-prose @container my-8">
	<div class="grid grid-cols-1 gap-4 @xl:grid-cols-2">
		<div>
			<p class="text-muted-foreground mb-2 text-sm">Linear (standard CSS)</p>
			<div
				class="h-24 rounded-lg bg-[repeating-conic-gradient(oklch(95%_0_0)_0%_25%,oklch(85%_0_0)_0%_50%)] bg-size-[20px_20px]"
			>
				<div
					class="size-full rounded-lg bg-linear-to-r from-black to-transparent"
				></div>
			</div>
			<code class="text-muted-foreground mt-2 block text-xs">
				bg-linear-to-r from-black to-transparent
			</code>
		</div>

		<div>
			<p class="text-muted-foreground mb-2 text-sm">Eased (smooth)</p>
			<div
				class="h-24 rounded-lg bg-[repeating-conic-gradient(oklch(95%_0_0)_0%_25%,oklch(85%_0_0)_0%_50%)] bg-size-[20px_20px]"
			>
				<div
					class="bg-ease-to-r size-full rounded-lg from-black to-transparent"
				></div>
			</div>
			<code class="text-muted-foreground mt-2 block text-xs">
				bg-ease-to-r from-black to-transparent
			</code>
		</div>
	</div>
</div>
