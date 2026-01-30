<section class="@container mx-auto max-w-2xl px-4 pb-20 sm:px-6">
	<div class="grid gap-2 sm:gap-4 @xs:grid-cols-2">
		<!-- Linear (banding visible) -->
		<div class="space-y-3">
			<div
				class="ring-border before:from-brand after:from-brand relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1/3 before:bg-linear-to-b before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-1/3 after:bg-linear-to-t after:to-transparent after:content-['']"
			>
				<span class="text-brand relative z-20 text-sm font-medium">
					tailwind
				</span>
			</div>
		</div>

		<!-- Eased (smooth) -->
		<div class="space-y-3">
			<div
				class="ring-brand before:bg-ease-in-out-to-b after:bg-ease-in-out-to-t before:from-brand after:from-brand relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1/3 before:to-transparent before:content-[''] after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-1/3 after:to-transparent after:content-['']"
			>
				<span class="text-brand relative z-20 text-sm font-medium">
					tw-easing-gradients
				</span>
			</div>
		</div>
	</div>
</section>
