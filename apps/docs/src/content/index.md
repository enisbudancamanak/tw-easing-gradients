---
title: Introduction
description: Smooth easing gradients for Tailwind CSS v4
section: Overview
---

<script>
	import ImageOverlayDemo from '$lib/components/docs/ImageOverlayDemo.svelte'
	import CardOverlay from '$lib/components/docs/CardOverlay.svelte'
	import PseudoOverlay from '$lib/components/docs/examples/PseudoOverlay.svelte'
	import GradientComparison from '$lib/components/docs/GradientComparison.svelte'
	import { Card, CardGrid } from '@svecodocs/kit'
</script>

<ImageOverlayDemo />

**tw-easing-gradients** creates smooth, perceptually uniform gradients for Tailwind CSS v4. Drag the slider above to see the difference.

<PseudoOverlay />

## The Problem

Standard CSS gradients use linear interpolation, which creates visible "banding" - harsh edges especially noticeable when fading to transparency or between certain color pairs.

## Card Overlays

A common use case: text overlays on images. The linear gradient stays solid and doesn't blend, while the eased version fades naturally into the image:

<CardOverlay />

## Features

- **Smooth transitions** - No more harsh color bands
- **oklch color space** - Colors blend naturally without getting gray or muddy in the middle
- **Multiple easing functions** - ease, ease-in, ease-out, ease-in-out
- **All directions** - 8 gradient directions supported
- **Works with Tailwind colors** - Uses existing `from-*` and `to-*` utilities
- **Zero runtime JS** - Pure CSS output

## Quick Start

```html
<!-- Standard Tailwind -->
<div class="bg-linear-to-b from-black to-transparent"></div>

<!-- With tw-easing-gradients -->
<div class="bg-ease-to-b from-black to-transparent"></div>
```

<GradientComparison />

## Next Steps

<CardGrid cols={2}>
	<Card title="Getting Started" href="/docs/getting-started">
		Install and configure tw-easing-gradients in your project.
	</Card>
	<Card title="Playground" href="/playground">
		Experiment with easing gradients interactively.
	</Card>
</CardGrid>
