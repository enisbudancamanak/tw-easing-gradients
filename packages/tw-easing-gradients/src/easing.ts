import type { Coordinate, EasingFunction } from './types.js';
import { EASING_FUNCTIONS } from './types.js';

function cubicBezier(t: number, p1: number, p2: number): number {
	const mt = 1 - t;
	return 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t;
}

export function getCoordinatesFromControlPoints(
	controlPoints: readonly [number, number, number, number],
	stops = 15,
): Coordinate[] {
	if (stops < 2 || stops > 100) {
		throw new Error(`stops must be between 2 and 100, got: ${stops}`);
	}

	const [x1, y1, x2, y2] = controlPoints;
	const coords: Coordinate[] = [];

	for (let i = 0; i <= stops; i++) {
		const t = i / stops;
		coords.push({ x: cubicBezier(t, x1, x2), y: cubicBezier(t, y1, y2) });
	}

	return coords;
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

	return getCoordinatesFromControlPoints(EASING_FUNCTIONS[easing], stops);
}

export function parseBezierValues(
	input: string,
): [number, number, number, number] | null {
	const cleaned = input
		.replace(/^cubic-bezier\(/i, '')
		.replace(/\)$/, '')
		.trim();
	const parts = cleaned.split(',').map((s) => Number(s.trim()));

	if (parts.length !== 4 || parts.some(Number.isNaN)) return null;

	return parts as [number, number, number, number];
}
