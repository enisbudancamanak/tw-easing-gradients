// src/index.ts
import plugin from "tailwindcss/plugin";

// src/types.ts
var EASING_FUNCTIONS = {
  ease: [0.25, 0.1, 0.25, 1],
  "ease-in": [0.42, 0, 1, 1],
  "ease-out": [0, 0, 0.58, 1],
  "ease-in-out": [0.42, 0, 0.58, 1]
};
var DIRECTIONS = {
  t: "to top",
  r: "to right",
  b: "to bottom",
  l: "to left",
  tl: "to top left",
  tr: "to top right",
  bl: "to bottom left",
  br: "to bottom right"
};

// src/easing.ts
function cubicBezier(t, p1, p2) {
  const mt = 1 - t;
  return 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t;
}
function getCoordinates(easing, stops = 15) {
  if (!(easing in EASING_FUNCTIONS)) {
    throw new Error(
      `Invalid easing: "${easing}". Valid options: ease, ease-in, ease-out, ease-in-out`
    );
  }
  if (stops < 2 || stops > 100) {
    throw new Error(`stops must be between 2 and 100, got: ${stops}`);
  }
  const [x1, y1, x2, y2] = EASING_FUNCTIONS[easing];
  const coords = [];
  for (let i = 0; i <= stops; i++) {
    const t = i / stops;
    coords.push({ x: cubicBezier(t, x1, x2), y: cubicBezier(t, y1, y2) });
  }
  return coords;
}

// src/index.ts
var EASINGS = [
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out"
];
var DIRECTIONS_KEYS = [
  "t",
  "r",
  "b",
  "l",
  "tl",
  "tr",
  "bl",
  "br"
];
function generateGradientStops(coordinates) {
  return coordinates.map(({ x, y }) => {
    const position = Math.round(x * 1e3) / 10;
    const percentage = Math.round(y * 1e3) / 10;
    if (percentage === 0) {
      return `var(--tw-gradient-from) ${position}%`;
    }
    if (percentage === 100) {
      return `oklch(from var(--tw-gradient-to, oklch(from var(--tw-gradient-from) l c h / 0)) l c h / alpha) ${position}%`;
    }
    return `oklch(from color-mix(in oklch, var(--tw-gradient-to, oklch(from var(--tw-gradient-from) l c h / 0)) ${percentage}%, var(--tw-gradient-from)) l c h / alpha) ${position}%`;
  }).join(", ");
}
var easingGradients = plugin.withOptions(
  (options = {}) => ({ addUtilities }) => {
    const stops = options.stops ?? 15;
    const utilities = {};
    for (const easing of EASINGS) {
      for (const dir of DIRECTIONS_KEYS) {
        const className = easing === "ease" ? `.bg-ease-to-${dir}` : `.bg-${easing}-to-${dir}`;
        const gradientStops = generateGradientStops(
          getCoordinates(easing, stops)
        );
        utilities[className] = {
          "background-image": `linear-gradient(${DIRECTIONS[dir]}, var(--tw-gradient-from), var(--tw-gradient-to, transparent))`,
          "@supports (color: oklch(from red l c h))": {
            "background-image": `linear-gradient(${DIRECTIONS[dir]}, ${gradientStops})`
          }
        };
      }
    }
    addUtilities(utilities);
  }
);
var index_default = easingGradients;
export {
  index_default as default,
  getCoordinates
};
