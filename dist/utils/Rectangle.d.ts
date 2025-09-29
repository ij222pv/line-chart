import Point from "./Point";
export default class Rectangle {
    private _top;
    private _left;
    private _right;
    private _bottom;
    constructor(topLeftPoint: Point, bottomRightPoint: Point);
    /**
     * Get the top left point of the rectangle.
     */
    get topLeft(): Point;
    /**
     * Get the top right point of the rectangle.
     */
    get topRight(): Point;
    /**
     * Get the bottom right point of the rectangle.
     */
    get bottomRight(): Point;
    /**
     * Get the bottom left point of the rectangle.
     */
    get bottomLeft(): Point;
    get top(): number;
    get right(): number;
    get bottom(): number;
    get left(): number;
    /**
     * Get the width of the rectangle.
     */
    get width(): number;
    /**
     * Get the height of the rectangle.
     */
    get height(): number;
    /**
     * Validates a point to make sure it's suitable to be used as a corner of the rectangle.
     * @throws TypeError if not of type Point.
     */
    private validatePoint;
}
