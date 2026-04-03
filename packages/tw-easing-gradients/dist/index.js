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
function getCoordinatesFromControlPoints(controlPoints, stops = 15) {
  if (stops < 2 || stops > 100) {
    throw new Error(`stops must be between 2 and 100, got: ${stops}`);
  }
  const [x1, y1, x2, y2] = controlPoints;
  const coords = [];
  for (let i = 0; i <= stops; i++) {
    const t = i / stops;
    coords.push({ x: cubicBezier(t, x1, x2), y: cubicBezier(t, y1, y2) });
  }
  return coords;
}
function getCoordinates(easing, stops = 15) {
  if (!(easing in EASING_FUNCTIONS)) {
    throw new Error(
      `Invalid easing: "${easing}". Valid options: ease, ease-in, ease-out, ease-in-out`
    );
  }
  return getCoordinatesFromControlPoints(EASING_FUNCTIONS[easing], stops);
}
function parseBezierValues(input) {
  const cleaned = input.replace(/^cubic-bezier\(/i, "").replace(/\)$/, "").trim();
  const parts = cleaned.split(",").map((s) => Number(s.trim()));
  if (parts.length !== 4 || parts.some(Number.isNaN)) return null;
  return parts;
}

// src/index.ts
var EASINGS = Object.keys(EASING_FUNCTIONS);
var DIRECTION_KEYS = Object.keys(DIRECTIONS);
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
function makeGradientUtility(cssDirection, gradientStops) {
  return {
    "background-image": `linear-gradient(${cssDirection}, var(--tw-gradient-from), var(--tw-gradient-to, transparent))`,
    "@supports (color: oklch(from red l c h))": {
      "background-image": `linear-gradient(${cssDirection}, ${gradientStops})`
    }
  };
}
var easingGradients = plugin.withOptions(
  (options = {}) => ({ addUtilities, matchUtilities }) => {
    const stops = options.stops ?? 15;
    const utilities = {};
    for (const easing of EASINGS) {
      const gradientStops = generateGradientStops(
        getCoordinates(easing, stops)
      );
      for (const dir of DIRECTION_KEYS) {
        utilities[`.bg-${easing}-to-${dir}`] = makeGradientUtility(DIRECTIONS[dir], gradientStops);
      }
    }
    addUtilities(utilities);
    const matchers = {};
    for (const dir of DIRECTION_KEYS) {
      matchers[`bg-ease-to-${dir}`] = (value) => {
        const points = parseBezierValues(value);
        if (!points) return {};
        const coords = getCoordinatesFromControlPoints(points, stops);
        return makeGradientUtility(DIRECTIONS[dir], generateGradientStops(coords));
      };
    }
    matchUtilities(matchers, { values: {}, type: "any" });
  }
);
var index_default = easingGradients;
export {
  index_default as default,
  getCoordinates,
  getCoordinatesFromControlPoints,
  parseBezierValues
};
