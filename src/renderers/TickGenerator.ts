import type Range from "../model/Range";

export default class TickGenerator {
  /**
   * A generator function to yield the positions of axis ticks along an axis.
   */
  public *generate(range: Range, goalNumberOfTicks: number): Generator<number> {
    const targetInterval = range.length / goalNumberOfTicks;
    const finalInterval = this.roundToNiceTickInterval(targetInterval);

    for (
      let i = Math.ceil(range.start / finalInterval) * finalInterval;
      i <= range.end;
      i += finalInterval
    ) {
      yield i;
    }
  }

  /**
   * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
   */
  private roundToNiceTickInterval(unrounded: number): number {
    const possibleIntervals = this.getPossibleTickIntervals(unrounded);
    return this.getClosestNumberInArray(unrounded, possibleIntervals);
  }

  private getPossibleTickIntervals(unrounded: number): number[] {
    const closestPowerOfTen = this.getClosestPowerOfTen(unrounded);
    return [closestPowerOfTen, closestPowerOfTen * 2, closestPowerOfTen * 5];
  }

  private getClosestPowerOfTen(number: number): number {
    return Math.pow(10, Math.floor(Math.log10(number)));
  }

  private getClosestNumberInArray(number: number, array: number[]): number {
    return array.reduce((previous, current) => {
      if (Math.abs(number - current) < Math.abs(number - previous)) {
        return current;
      } else {
        return previous;
      }
    });
  }
}
