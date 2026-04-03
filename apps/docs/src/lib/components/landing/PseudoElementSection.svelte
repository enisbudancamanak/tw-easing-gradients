<section class="@container mx-auto max-w-2xl px-4 pb-20 sm:px-6">
	<div class="grid gap-2 sm:gap-4 @xs:grid-cols-2">
		<!-- Linear (banding visible) -->
		<div class="space-y-3">
			<div
				class="ring-border relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1"
			>
				<div class="from-brand pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-linear-to-b to-transparent"></div>
				<div class="from-brand pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-linear-to-t to-transparent"></div>
				<span class="text-brand relative z-20 text-sm font-medium">
					tailwind
				</span>
			</div>
		</div>

		<!-- Eased (smooth) -->
		<div class="space-y-3">
			<div
				class="ring-brand relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-white ring-1"
			>
				<div class="from-brand pointer-events-none absolute inset-x-0 top-0 z-10 h-1/3 bg-ease-in-out-to-b to-transparent"></div>
				<div class="from-brand pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/3 bg-ease-in-out-to-t to-transparent"></div>
				<span class="text-brand relative z-20 text-sm font-medium">
					tw-easing-gradients
				</span>
			</div>
		</div>
	</div>
</section>
