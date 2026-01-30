---
title: Getting Started
description: Install and configure tw-easing-gradients
section: Overview
---

<script>
	import { Tabs, TabItem, Steps, Step, Callout, Card, CardGrid } from '@svecodocs/kit'
</script>

<Steps>
<Step>Install the package</Step>

<Tabs items={["pnpm", "npm", "yarn"]}>
<TabItem value="pnpm">

```bash
pnpm add tw-easing-gradients
```

</TabItem>
<TabItem value="npm">

```bash
npm install tw-easing-gradients
```

</TabItem>
<TabItem value="yarn">

```bash
yarn add tw-easing-gradients
```

</TabItem>
</Tabs>

<Step>Add the plugin to your CSS</Step>

```css
/* app.css */
@import 'tailwindcss';
@plugin 'tw-easing-gradients';
```

You can optionally configure the number of color stops:

```css
@plugin 'tw-easing-gradients' {
	stops: 20;
}
```

<Step>Use easing gradients</Step>

Use the utilities together with Tailwind's `from-*` and `to-*` color utilities:

```html
<div class="bg-ease-to-b from-black to-transparent">
	<!-- Smooth fade to transparent -->
</div>
```

</Steps>

<Callout type="note" title="Requirements">
This plugin requires <strong>Tailwind CSS v4</strong>.
</Callout>

<Callout type="note" title="Browser Support">
This plugin uses modern CSS features (<code>oklch</code> and <code>color-mix</code>). For older browsers, a simple linear gradient fallback is automatically included.
</Callout>

## Next Steps

<CardGrid cols={3}>
	<Card title="Utilities" href="/docs/utilities">
		All available easing gradient classes and directions.
	</Card>
	<Card title="Examples" href="/docs/examples">
		Practical use cases with live previews.
	</Card>
	<Card title="API Reference" href="/docs/api-reference">
		Configuration options and technical details.
	</Card>
</CardGrid>
