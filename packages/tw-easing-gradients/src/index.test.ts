import { describe, it, expect, vi } from 'vitest';
import easingGradients, { getCoordinates } from './index.js';

describe('easingGradients plugin', () => {
	it('exports getCoordinates function', () => {
		expect(typeof getCoordinates).toBe('function');
	});

	it('exports default plugin', () => {
		expect(easingGradients).toBeDefined();
	});

	describe('plugin generates utilities', () => {
		it('generates all easing-direction combinations', () => {
			const addUtilities = vi.fn();
			const plugin = easingGradients();

			plugin.handler({
				addUtilities,
				matchUtilities: vi.fn(),
				addComponents: vi.fn(),
				matchComponents: vi.fn(),
				addBase: vi.fn(),
				addVariant: vi.fn(),
				matchVariant: vi.fn(),
				theme: vi.fn(),
				config: vi.fn(),
			} as any);

			expect(addUtilities).toHaveBeenCalledTimes(1);

			const utilities = addUtilities.mock.calls[0][0];
			const classNames = Object.keys(utilities);

			expect(classNames).toHaveLength(32);
			expect(classNames).toContain('.bg-ease-to-r');
			expect(classNames).toContain('.bg-ease-in-to-b');
			expect(classNames).toContain('.bg-ease-out-to-tl');
			expect(classNames).toContain('.bg-ease-in-out-to-br');
		});

		it('generates fallback CSS as base property', () => {
			const addUtilities = vi.fn();
			const plugin = easingGradients();

			plugin.handler({
				addUtilities,
				matchUtilities: vi.fn(),
				addComponents: vi.fn(),
				matchComponents: vi.fn(),
				addBase: vi.fn(),
				addVariant: vi.fn(),
				matchVariant: vi.fn(),
				theme: vi.fn(),
				config: vi.fn(),
			} as any);

			const utilities = addUtilities.mock.calls[0][0];
			const fallbackValue = utilities['.bg-ease-to-r']['background-image'];

			// Fallback sollte einfacher 2-stop linear-gradient sein
			expect(fallbackValue).toContain('linear-gradient');
			expect(fallbackValue).toContain('to right');
			expect(fallbackValue).toContain('var(--tw-gradient-from)');
			expect(fallbackValue).toContain('var(--tw-gradient-to');
			expect(fallbackValue).not.toContain('oklch');
			expect(fallbackValue).not.toContain('color-mix');
		});

		it('generates CSS with color-mix in nested @supports block', () => {
			const addUtilities = vi.fn();
			const plugin = easingGradients();

			plugin.handler({
				addUtilities,
				matchUtilities: vi.fn(),
				addComponents: vi.fn(),
				matchComponents: vi.fn(),
				addBase: vi.fn(),
				addVariant: vi.fn(),
				matchVariant: vi.fn(),
				theme: vi.fn(),
				config: vi.fn(),
			} as any);

			expect(addUtilities).toHaveBeenCalledTimes(1);
			const utilities = addUtilities.mock.calls[0][0];
			const supportsBlock =
				utilities['.bg-ease-to-r'][
					'@supports (color: oklch(from red l c h))'
				];
			const cssValue = supportsBlock['background-image'];

			expect(cssValue).toContain('linear-gradient');
			expect(cssValue).toContain('to right');
			expect(cssValue).toContain('color-mix(in oklch');
			expect(cssValue).toContain('var(--tw-gradient-from)');
			expect(cssValue).toContain('var(--tw-gradient-to');
		});

		it('respects custom stops option', () => {
			const addUtilities = vi.fn();
			const plugin = easingGradients({ stops: 5 });

			plugin.handler({
				addUtilities,
				matchUtilities: vi.fn(),
				addComponents: vi.fn(),
				matchComponents: vi.fn(),
				addBase: vi.fn(),
				addVariant: vi.fn(),
				matchVariant: vi.fn(),
				theme: vi.fn(),
				config: vi.fn(),
			} as any);

			const utilities = addUtilities.mock.calls[0][0];
			const supportsBlock =
				utilities['.bg-ease-to-r'][
					'@supports (color: oklch(from red l c h))'
				];
			const cssValue = supportsBlock['background-image'];

			const colorMixCount = (cssValue.match(/color-mix/g) || []).length;
			expect(colorMixCount).toBe(4);
		});

		it('uses default 15 stops when no option provided', () => {
			const addUtilities = vi.fn();
			const plugin = easingGradients();

			plugin.handler({
				addUtilities,
				matchUtilities: vi.fn(),
				addComponents: vi.fn(),
				matchComponents: vi.fn(),
				addBase: vi.fn(),
				addVariant: vi.fn(),
				matchVariant: vi.fn(),
				theme: vi.fn(),
				config: vi.fn(),
			} as any);

			const utilities = addUtilities.mock.calls[0][0];
			const supportsBlock =
				utilities['.bg-ease-to-r'][
					'@supports (color: oklch(from red l c h))'
				];
			const cssValue = supportsBlock['background-image'];

			const colorMixCount = (cssValue.match(/color-mix/g) || []).length;
			expect(colorMixCount).toBe(14);
		});
	});

	describe('gradient directions', () => {
		const directionMap = {
			t: 'to top',
			r: 'to right',
			b: 'to bottom',
			l: 'to left',
			tl: 'to top left',
			tr: 'to top right',
			bl: 'to bottom left',
			br: 'to bottom right',
		};

		it.each(Object.entries(directionMap))(
			'generates correct direction for %s → %s',
			(dir, expected) => {
				const addUtilities = vi.fn();
				const plugin = easingGradients();

				plugin.handler({
					addUtilities,
					matchUtilities: vi.fn(),
					addComponents: vi.fn(),
					matchComponents: vi.fn(),
					addBase: vi.fn(),
					addVariant: vi.fn(),
					matchVariant: vi.fn(),
					theme: vi.fn(),
					config: vi.fn(),
				} as any);

				const utilities = addUtilities.mock.calls[0][0];
				// Prüfe Fallback-Richtung
				const fallbackValue =
					utilities[`.bg-ease-to-${dir}`]['background-image'];
				expect(fallbackValue).toContain(`linear-gradient(${expected},`);
			},
		);
	});

	describe('class naming', () => {
		it('uses "bg-ease-to-" for ease (no redundant "ease")', () => {
			const addUtilities = vi.fn();
			const plugin = easingGradients();

			plugin.handler({
				addUtilities,
				matchUtilities: vi.fn(),
				addComponents: vi.fn(),
				matchComponents: vi.fn(),
				addBase: vi.fn(),
				addVariant: vi.fn(),
				matchVariant: vi.fn(),
				theme: vi.fn(),
				config: vi.fn(),
			} as any);

			const classNames = Object.keys(addUtilities.mock.calls[0][0]);

			expect(classNames).toContain('.bg-ease-to-r');
			expect(classNames).not.toContain('.bg-ease-ease-to-r');
		});

		it('uses "bg-ease-in-to-" for ease-in', () => {
			const addUtilities = vi.fn();
			const plugin = easingGradients();

			plugin.handler({
				addUtilities,
				matchUtilities: vi.fn(),
				addComponents: vi.fn(),
				matchComponents: vi.fn(),
				addBase: vi.fn(),
				addVariant: vi.fn(),
				matchVariant: vi.fn(),
				theme: vi.fn(),
				config: vi.fn(),
			} as any);

			const classNames = Object.keys(addUtilities.mock.calls[0][0]);
			expect(classNames).toContain('.bg-ease-in-to-r');
		});
	});
});

describe('exports', () => {
	it('exports all types', async () => {
		const exports = await import('./index.js');

		expect(exports.getCoordinates).toBeDefined();
		expect(exports.default).toBeDefined();
	});
});
