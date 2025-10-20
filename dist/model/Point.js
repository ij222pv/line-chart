export default class Point {
    _x = 0;
    _y = 0;
    /**
     * Creates a Point in 2D space.
     * @param x The x coordinate of the point.
     * @param y The y coordinate of the point.
     */
    constructor(x, y) {
        this.validateNumber(x);
        this.validateNumber(y);
        this._x = x;
        this._y = y;
    }
    /**
     * Get the x coordinate of the point.
     */
    get x() {
        return this._x;
    }
    /**
     * Get the y coordinate of the point.
     */
    get y() {
        return this._y;
    }
    /**
     * Make sure a value is a number suitable to be assigned to one of the point's x or y coordinates.
     * @throws TypeError if not a number.
     */
    validateNumber(value) {
        if (typeof value !== "number") {
            throw new TypeError("argument must be number");
        }
    }
}
