import Point from "./Point";
export default class Rectangle {
    _top = 0;
    _left = 0;
    _right = 0;
    _bottom = 0;
    constructor(topLeftPoint, bottomRightPoint) {
        this.validatePoint(topLeftPoint);
        this.validatePoint(bottomRightPoint);
        this._top = topLeftPoint.y;
        this._left = topLeftPoint.x;
        this._bottom = bottomRightPoint.y;
        this._right = bottomRightPoint.x;
    }
    /**
     * Get the top left point of the rectangle.
     */
    get topLeft() {
        return new Point(this.left, this.top);
    }
    /**
     * Get the top right point of the rectangle.
     */
    get topRight() {
        return new Point(this.right, this.top);
    }
    /**
     * Get the bottom right point of the rectangle.
     */
    get bottomRight() {
        return new Point(this.right, this.bottom);
    }
    /**
     * Get the bottom left point of the rectangle.
     */
    get bottomLeft() {
        return new Point(this.left, this.bottom);
    }
    get top() {
        return this._top;
    }
    get right() {
        return this._right;
    }
    get bottom() {
        return this._bottom;
    }
    get left() {
        return this._left;
    }
    /**
     * Get the width of the rectangle.
     */
    get width() {
        return this.right - this.left;
    }
    /**
     * Get the height of the rectangle.
     */
    get height() {
        return this.bottom - this.top;
    }
    /**
     * Validates a point to make sure it's suitable to be used as a corner of the rectangle.
     * @throws TypeError if not of type Point.
     */
    validatePoint(point) {
        if (!(point instanceof Point)) {
            throw new TypeError("argument not of type Point");
        }
    }
}
