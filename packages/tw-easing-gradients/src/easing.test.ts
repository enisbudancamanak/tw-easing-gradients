import { describe, it, expect } from 'vitest';
import { getCoordinates } from './easing.js';

describe('getCoordinates', () => {
	describe('valid inputs', () => {
		it('returns correct number of points (stops + 1)', () => {
			const coords = getCoordinates('ease', 15);
			expect(coords).toHaveLength(16);
		});

		it('returns stops + 1 points for custom stops value', () => {
			const coords = getCoordinates('ease-in', 10);
			expect(coords).toHaveLength(11);
		});

		it('first point starts at (0, 0)', () => {
			const coords = getCoordinates('ease', 15);
			expect(coords[0].x).toBeCloseTo(0, 5);
			expect(coords[0].y).toBeCloseTo(0, 5);
		});

		it('last point ends at (1, 1)', () => {
			const coords = getCoordinates('ease', 15);
			const last = coords[coords.length - 1];
			expect(last.x).toBeCloseTo(1, 5);
			expect(last.y).toBeCloseTo(1, 5);
		});

		it('all coordinates are between 0 and 1', () => {
			const easings = ['ease', 'ease-in', 'ease-out', 'ease-in-out'] as const;

			for (const easing of easings) {
				const coords = getCoordinates(easing, 15);
				for (const { x, y } of coords) {
					expect(x).toBeGreaterThanOrEqual(0);
					expect(x).toBeLessThanOrEqual(1);
					expect(y).toBeGreaterThanOrEqual(0);
					expect(y).toBeLessThanOrEqual(1);
				}
			}
		});

		it('x coordinates are monotonically increasing', () => {
			const coords = getCoordinates('ease', 15);
			for (let i = 1; i < coords.length; i++) {
				expect(coords[i].x).toBeGreaterThanOrEqual(coords[i - 1].x);
			}
		});

		it('works with minimum stops (2)', () => {
			const coords = getCoordinates('ease', 2);
			expect(coords).toHaveLength(3);
		});

		it('works with maximum stops (100)', () => {
			const coords = getCoordinates('ease', 100);
			expect(coords).toHaveLength(101);
		});
	});

	describe('easing curves have correct characteristics', () => {
		it('ease-in starts slow (low y values at beginning)', () => {
			const coords = getCoordinates('ease-in', 10);
			// At 30% of the x-range, y should be less than 30% for ease-in
			const earlyPoint = coords[3]; // roughly 30% through
			expect(earlyPoint.y).toBeLessThan(earlyPoint.x);
		});

		it('ease-out ends slow (high y values early)', () => {
			const coords = getCoordinates('ease-out', 10);
			// At 30% of the x-range, y should be more than 30% for ease-out
			const earlyPoint = coords[3];
			expect(earlyPoint.y).toBeGreaterThan(earlyPoint.x);
		});
	});

	describe('invalid inputs', () => {
		it('throws error for invalid easing function', () => {
			expect(() => getCoordinates('invalid' as any, 15)).toThrow(
				'Invalid easing: "invalid"',
			);
		});

		it('throws error for stops below minimum (2)', () => {
			expect(() => getCoordinates('ease', 1)).toThrow(
				'stops must be between 2 and 100',
			);
		});

		it('throws error for stops above maximum (100)', () => {
			expect(() => getCoordinates('ease', 101)).toThrow(
				'stops must be between 2 and 100',
			);
		});

		it('throws error for negative stops', () => {
			expect(() => getCoordinates('ease', -5)).toThrow(
				'stops must be between 2 and 100',
			);
		});
	});
});
