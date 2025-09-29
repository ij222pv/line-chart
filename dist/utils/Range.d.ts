export default class Range {
    start: number;
    end: number;
    constructor(start?: number, end?: number);
    /**
     * @throws TypeError if not a number.
     */
    private validateNumber;
    /**
     * @return The length of the range.
     */
    get length(): number;
}
