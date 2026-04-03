---
"tw-easing-gradients": minor
---

feat: add custom bezier curves and optimize plugin

### Custom Bezier Curves

Use arbitrary easing values with bracket notation:

```html
<div class="bg-ease-to-r-[0.22,1,0.36,1] from-black"></div>
```

The four values are cubic bezier control points (x1, y1, x2, y2).

### New Exports

- `getCoordinatesFromControlPoints(controlPoints, stops)` — compute easing coordinates from raw control points
- `parseBezierValues(input)` — parse comma-separated bezier strings

### Optimizations

- Gradient stops now cached per easing (4 computations instead of 32)
- Removed redundant class name ternary
- Constants derived from source types instead of manually duplicated
- `matchUtilities` batched into single call
- `getCoordinatesFromControlPoints` accepts `readonly` tuples (no unnecessary type casts)

### Docs

- Interactive custom bezier curve editor in playground
- Custom bezier documented in utilities, examples, and getting started
- Landing page updated with custom curves mention
- Pseudo-element examples replaced with absolute div pattern
- Package manager tabs on install button (pnpm/npm/yarn/bun)
