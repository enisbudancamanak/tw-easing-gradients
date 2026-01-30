<div class="not-prose my-6">
	<div class="border-border relative h-48 overflow-hidden rounded-xl border">
		<div class="h-full space-y-2 overflow-y-auto p-4">
			{#each Array(12) as _, i}
				<p class="text-muted-foreground text-sm">
					Line {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</p>
			{/each}
		</div>
		<div
			class="bg-ease-in-to-t from-background pointer-events-none absolute right-0 bottom-0 left-0 h-20"
		></div>
	</div>
</div>
