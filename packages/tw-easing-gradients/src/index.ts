import plugin from 'tailwindcss/plugin';
import { getCoordinates } from './easing.js';
import type { Direction, EasingFunction, PluginOptions } from './types.js';
import { DIRECTIONS, EASING_FUNCTIONS } from './types.js';

export { getCoordinates } from './easing.js';
export type {
	Coordinate,
	Direction,
	EasingFunction,
	PluginOptions,
} from './types.js';

type TailwindPlugin = ReturnType<typeof plugin.withOptions<PluginOptions>>;

const EASINGS: readonly EasingFunction[] = [
	'ease',
	'ease-in',
	'ease-out',
	'ease-in-out',
];
const DIRECTIONS_KEYS: readonly Direction[] = [
	't',
	'r',
	'b',
	'l',
	'tl',
	'tr',
	'bl',
	'br',
];

function generateGradientStops(
	coordinates: Array<{ x: number; y: number }>,
): string {
	return coordinates
		.map(({ x, y }) => {
			const position = Math.round(x * 1000) / 10;
			const percentage = Math.round(y * 1000) / 10;

			if (percentage === 0) {
				return `var(--tw-gradient-from) ${position}%`;
			}
			if (percentage === 100) {
				return `oklch(from var(--tw-gradient-to, oklch(from var(--tw-gradient-from) l c h / 0)) l c h / alpha) ${position}%`;
			}
			return `oklch(from color-mix(in oklch, var(--tw-gradient-to, oklch(from var(--tw-gradient-from) l c h / 0)) ${percentage}%, var(--tw-gradient-from)) l c h / alpha) ${position}%`;
		})
		.join(', ');
}

const easingGradients: TailwindPlugin = plugin.withOptions<PluginOptions>(
	(options = {}) =>
		({ addUtilities }) => {
			const stops = options.stops ?? 15;
			const utilities: Record<
				string,
				Record<string, string | Record<string, string>>
			> = {};

			for (const easing of EASINGS) {
				for (const dir of DIRECTIONS_KEYS) {
					const className =
						easing === 'ease'
							? `.bg-ease-to-${dir}`
							: `.bg-${easing}-to-${dir}`;
					const gradientStops = generateGradientStops(
						getCoordinates(easing, stops),
					);

						utilities[className] = {
						'background-image': `linear-gradient(${DIRECTIONS[dir]}, var(--tw-gradient-from), var(--tw-gradient-to, transparent))`,
						'@supports (color: oklch(from red l c h))': {
							'background-image': `linear-gradient(${DIRECTIONS[dir]}, ${gradientStops})`,
						},
					};
				}
			}

			addUtilities(utilities);
		},
);

export default easingGradients;
