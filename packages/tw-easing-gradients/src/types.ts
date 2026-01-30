export type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
export type Direction = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br';

export interface Coordinate {
	x: number;
	y: number;
}

export interface PluginOptions {
	stops?: number;
}

export const EASING_FUNCTIONS = {
	ease: [0.25, 0.1, 0.25, 1],
	'ease-in': [0.42, 0, 1, 1],
	'ease-out': [0, 0, 0.58, 1],
	'ease-in-out': [0.42, 0, 0.58, 1],
} as const satisfies Record<
	EasingFunction,
	readonly [number, number, number, number]
>;

export const DIRECTIONS = {
	t: 'to top',
	r: 'to right',
	b: 'to bottom',
	l: 'to left',
	tl: 'to top left',
	tr: 'to top right',
	bl: 'to bottom left',
	br: 'to bottom right',
} as const satisfies Record<Direction, string>;
