![tw-easing-gradients banner](https://raw.githubusercontent.com/enisbudancamanak/tw-easing-gradients/main/apps/docs/static/og.png)

<div align="center">

[![License](https://img.shields.io/github/license/enisbudancamanak/tw-easing-gradients?style=flat-square)](https://github.com/enisbudancamanak/tw-easing-gradients/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/tw-easing-gradients?style=flat-square)](https://www.npmjs.com/package/tw-easing-gradients)

</div>

A Tailwind CSS v4 plugin that creates smooth, naturally blending gradients using cubic bezier easing and oklch color interpolation.

## Installation

```bash
npm install tw-easing-gradients
```

Add the plugin to your CSS file:

```css
@import 'tailwindcss';
@plugin "tw-easing-gradients";
```

## Usage

**Transparency Fade**

```html
<div class="bg-ease-to-b from-black">
  <!-- Fades from black to transparent -->
</div>
```

**Color-to-Color Gradient**

```html
<div class="bg-ease-in-out-to-br from-violet-600 to-pink-500">
  <!-- Smooth diagonal gradient -->
</div>
```

## CSS Output Example

The plugin generates multiple color stops using `color-mix()` in oklch color space:

**Input (Tailwind):**
```html
<div class="bg-ease-in-out-to-r from-[#6366F1] to-[#06B6D4]">
```

**Generated CSS:**
```css
.bg-ease-in-out-to-r {
  background-image: linear-gradient(
    to right,
    #6366F1 0%,
    oklch(from color-mix(in oklch, #06B6D4 1.3%, #6366F1) l c h / alpha) 8.1%,
    oklch(from color-mix(in oklch, #06B6D4 4.9%, #6366F1) l c h / alpha) 15.5%,
    oklch(from color-mix(in oklch, #06B6D4 10.4%, #6366F1) l c h / alpha) 22.5%,
    oklch(from color-mix(in oklch, #06B6D4 17.5%, #6366F1) l c h / alpha) 29%,
    oklch(from color-mix(in oklch, #06B6D4 25.9%, #6366F1) l c h / alpha) 35.3%,
    oklch(from color-mix(in oklch, #06B6D4 35.2%, #6366F1) l c h / alpha) 41.2%,
    oklch(from color-mix(in oklch, #06B6D4 45%, #6366F1) l c h / alpha) 47.1%,
    oklch(from color-mix(in oklch, #06B6D4 55%, #6366F1) l c h / alpha) 52.9%,
    oklch(from color-mix(in oklch, #06B6D4 64.8%, #6366F1) l c h / alpha) 58.8%,
    oklch(from color-mix(in oklch, #06B6D4 74.1%, #6366F1) l c h / alpha) 64.7%,
    oklch(from color-mix(in oklch, #06B6D4 82.5%, #6366F1) l c h / alpha) 71%,
    oklch(from color-mix(in oklch, #06B6D4 89.6%, #6366F1) l c h / alpha) 77.5%,
    oklch(from color-mix(in oklch, #06B6D4 95.1%, #6366F1) l c h / alpha) 84.5%,
    oklch(from color-mix(in oklch, #06B6D4 98.7%, #6366F1) l c h / alpha) 91.9%,
    #06B6D4 100%
  );
}
```

The easing function controls the distribution of color stops, creating smooth transitions instead of harsh linear blends.

## Configuration

Configure the number of gradient stops (default: 15):

```css
@plugin "tw-easing-gradients" {
  stops: 20;
}
```

More stops create smoother gradients but increase CSS output size.

## Inspiration & Prior Art

This plugin is inspired by the fantastic work on easing gradients:

- **[larsenwork.com](https://larsenwork.com)** — Andreas Larsen's original easing gradients concept and editor
- **[postcss-easing-gradients](https://github.com/larsenwork/postcss-easing-gradients)** — PostCSS plugin for easing gradients
- **[CSSWG Proposal](https://github.com/w3c/csswg-drafts/issues/1332)** — The W3C proposal for native easing gradient support

The core idea: linear gradients often have hard edges where they start and end. By controlling the color mix with easing functions and using perceptually uniform color spaces like oklch, we can create gradients that look natural and blend seamlessly.

## Documentation

Full API reference, examples, and interactive playground: [tw-easing-gradients.enisdev.com](https://tw-easing-gradients.enisdev.com)

## Contributing

Contributions are welcome! Please open an issue first to discuss larger changes.

1. Fork the repository
2. Create a branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Open a Pull Request

## License

[MIT](https://github.com/enisbudancamanak/tw-easing-gradients/blob/main/LICENSE)
