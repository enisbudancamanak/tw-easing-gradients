<div align="center">

# tw-easing-gradients

[![License](https://img.shields.io/github/license/enisbudancamanak/tw-easing-gradients?style=flat-square)](https://github.com/enisbudancamanak/tw-easing-gradients/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/tw-easing-gradients?style=flat-square)](https://www.npmjs.com/package/tw-easing-gradients)

A Tailwind CSS v4 plugin that creates smooth, naturally blending gradients using cubic bezier easing and oklch color interpolation.

</div>

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

## Available Classes

| Easing | Directions |
|--------|------------|
| `bg-ease-to-{dir}` | t, r, b, l, tl, tr, bl, br |
| `bg-ease-in-to-{dir}` | t, r, b, l, tl, tr, bl, br |
| `bg-ease-out-to-{dir}` | t, r, b, l, tl, tr, bl, br |
| `bg-ease-in-out-to-{dir}` | t, r, b, l, tl, tr, bl, br |

## Configuration

Configure the number of gradient stops (default: 15):

```css
@plugin "tw-easing-gradients" {
  stops: 20;
}
```

More stops create smoother gradients but increase CSS output size.

## How It Works

The plugin generates multiple color stops using `color-mix()` in oklch color space. The easing function controls the distribution of color stops, creating smooth transitions instead of harsh linear blends.

## Documentation

Full API reference, examples, and interactive playground: [tw-easing-gradients.enisdev.com](https://tw-easing-gradients.enisdev.com)

## License

[MIT](https://github.com/enisbudancamanak/tw-easing-gradients/blob/main/LICENSE)
