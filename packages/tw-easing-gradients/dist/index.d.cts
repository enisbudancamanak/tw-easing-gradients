import plugin from 'tailwindcss/plugin';

type EasingFunction = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
type Direction = 't' | 'r' | 'b' | 'l' | 'tl' | 'tr' | 'bl' | 'br';
interface Coordinate {
    x: number;
    y: number;
}
interface PluginOptions {
    stops?: number;
}

declare function getCoordinatesFromControlPoints(controlPoints: readonly [number, number, number, number], stops?: number): Coordinate[];
declare function getCoordinates(easing: EasingFunction, stops?: number): Coordinate[];
declare function parseBezierValues(input: string): [number, number, number, number] | null;

type TailwindPlugin = ReturnType<typeof plugin.withOptions<PluginOptions>>;
declare const easingGradients: TailwindPlugin;

export { type Coordinate, type Direction, type EasingFunction, type PluginOptions, easingGradients as default, getCoordinates, getCoordinatesFromControlPoints, parseBezierValues };
