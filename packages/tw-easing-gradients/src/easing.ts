import type { Coordinate, EasingFunction } from './types.js';
import { EASING_FUNCTIONS } from './types.js';

function cubicBezier(t: number, p1: number, p2: number): number {
	const mt = 1 - t;
	return 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t;
}

export function getCoordinates(
	easing: EasingFunction,
	stops = 15,
): Coordinate[] {
	if (!(easing in EASING_FUNCTIONS)) {
		throw new Error(
			`Invalid easing: "${easing}". Valid options: ease, ease-in, ease-out, ease-in-out`,
		);
	}
	if (stops < 2 || stops > 100) {
		throw new Error(`stops must be between 2 and 100, got: ${stops}`);
	}

	const [x1, y1, x2, y2] = EASING_FUNCTIONS[easing];
	const coords: Coordinate[] = [];

	for (let i = 0; i <= stops; i++) {
		const t = i / stops;
		coords.push({ x: cubicBezier(t, x1, x2), y: cubicBezier(t, y1, y2) });
	}

	return coords;
}
