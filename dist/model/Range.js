export default class Range {
    start;
    end;
    constructor(start = 0, end = 1) {
        this.validateNumber(start);
        this.validateNumber(end);
        this.start = start;
        this.end = end;
    }
    /**
     * @throws TypeError if not a number.
     */
    validateNumber(value) {
        if (typeof value !== "number") {
            throw new TypeError("argument must be number");
        }
    }
    /**
     * @return The length of the range.
     */
    get length() {
        return this.end - this.start;
    }
}
