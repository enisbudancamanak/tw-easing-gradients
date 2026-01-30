---
title: Examples
description: Practical use cases for easing gradients
section: Reference
---

<script>
	import HeroOverlay from '$lib/components/docs/examples/HeroOverlay.svelte'
	import CardGradient from '$lib/components/docs/examples/CardGradient.svelte'
	import TextGradient from '$lib/components/docs/examples/TextGradient.svelte'
	import FadeOut from '$lib/components/docs/examples/FadeOut.svelte'
	import ButtonGradient from '$lib/components/docs/examples/ButtonGradient.svelte'
	import LoadingSkeleton from '$lib/components/docs/examples/LoadingSkeleton.svelte'
	import PseudoOverlay from '$lib/components/docs/examples/PseudoOverlay.svelte'
	import { Callout, Card, CardGrid } from '@svecodocs/kit'
</script>

## Hero Image Overlay

Create smooth fade overlays on hero images:

<HeroOverlay />

```html
<div class="relative h-96">
	<img src="/hero.jpg" class="absolute inset-0 h-full w-full object-cover" />
	<div class="absolute inset-0 bg-ease-to-t from-zinc-950"></div>
	<div class="absolute bottom-8 left-8">
		<h1 class="text-4xl font-bold text-white">Hero Title</h1>
	</div>
</div>
```

## Pseudo-Element Overlays

Apply gradients to `::before` and `::after` pseudo-elements for dual overlays:

<PseudoOverlay variant="black" />

```html
<div
	class="relative bg-white before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-1/3
    before:bg-ease-to-b before:from-black before:to-transparent before:content-['']
    after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-1/3
    after:bg-ease-to-t after:from-black after:to-transparent after:content-['']"
>
	<span class="relative z-20">Content</span>
</div>
```

## Card Gradient Background

Smooth color transitions for card backgrounds:

<CardGradient />

```html
<div class="rounded-xl bg-ease-in-out-to-br from-violet-600 to-pink-500 p-6">
	<h2 class="text-xl font-semibold text-white">Card Title</h2>
	<p class="text-white/80">Card content goes here.</p>
</div>
```

## Text Gradient

Apply eased gradients to text:

<TextGradient />

```html
<h1
	class="bg-ease-in-out-to-r from-indigo-500 to-cyan-500 bg-clip-text text-5xl font-bold text-transparent"
>
	Gradient Text
</h1>
```

## Fade Out Effect

Smooth content fade at the bottom of a scrollable container:

<FadeOut />

```html
<div class="relative h-64 overflow-hidden">
	<div class="h-full overflow-y-auto">
		<!-- Long content here -->
	</div>
	<div
		class="pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-ease-in-to-t from-background"
	></div>
</div>
```

## Button Hover Effect

Gradient buttons with smooth transitions:

<ButtonGradient />

```html
<button
	class="rounded-lg bg-ease-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white"
>
	Click Me
</button>
```

## Loading Skeleton

Animated loading placeholder with smooth gradients:

<LoadingSkeleton />

```html
<div
	class="h-4 animate-pulse rounded bg-ease-in-out-to-r from-zinc-200 to-zinc-300"
></div>
```

<Callout type="warning">
The `via-*` utility is not supported with easing gradients. Use only `from-*` and `to-*` for color stops.
</Callout>

## Next Steps

<CardGrid cols={2}>
	<Card title="API Reference" href="/docs/api-reference">
		Configuration options and technical details.
	</Card>
	<Card title="Playground" href="/playground">
		Experiment with easing gradients interactively.
	</Card>
</CardGrid>
