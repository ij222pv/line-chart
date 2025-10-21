import type Range from "../model/Range";
export default class TickGenerator {
    /**
     * A generator function to yield the positions of axis ticks along an axis.
     */
    generate(range: Range, goalNumberOfTicks: number): Generator<number>;
    /**
     * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
     */
    private roundToNiceTickInterval;
    private getPossibleTickIntervals;
    private getClosestPowerOfTen;
    private getClosestNumberInArray;
}
