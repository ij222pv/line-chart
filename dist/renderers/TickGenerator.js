export default class TickGenerator {
    /**
     * A generator function to yield the positions of axis ticks along an axis.
     */
    *generate(range, goalNumberOfTicks) {
        const targetInterval = range.length / goalNumberOfTicks;
        const finalInterval = this.roundToNiceTickInterval(targetInterval);
        for (let i = Math.ceil(range.start / finalInterval) * finalInterval; i <= range.end; i += finalInterval) {
            yield i;
        }
    }
    /**
     * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
     */
    roundToNiceTickInterval(unrounded) {
        const possibleIntervals = this.getPossibleTickIntervals(unrounded);
        return this.getClosestNumberInArray(unrounded, possibleIntervals);
    }
    getPossibleTickIntervals(unrounded) {
        const closestPowerOfTen = this.getClosestPowerOfTen(unrounded);
        return [closestPowerOfTen, closestPowerOfTen * 2, closestPowerOfTen * 5];
    }
    getClosestPowerOfTen(number) {
        return Math.pow(10, Math.floor(Math.log10(number)));
    }
    getClosestNumberInArray(number, array) {
        return array.reduce((previous, current) => {
            if (Math.abs(number - current) < Math.abs(number - previous)) {
                return current;
            }
            else {
                return previous;
            }
        });
    }
}
