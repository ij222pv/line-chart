export default class Point {
    private _x;
    private _y;
    constructor(x: number, y: number);
    /**
     * Get the x coordinate of the point.
     */
    get x(): number;
    /**
     * Get the y coordinate of the point.
     */
    get y(): number;
    /**
     * Make sure a value is a number suitable to be assigned to one of the point's x or y coordinates.
     * @throws TypeError if not a number.
     */
    private validateNumber;
}
