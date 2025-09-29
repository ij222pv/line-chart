import Point from "./Point";

export default class Rectangle {
  private _top: number = 0;
  private _left: number = 0;
  private _right: number = 0;
  private _bottom: number = 0;

  constructor(topLeftPoint: Point, bottomRightPoint: Point) {
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
  get topLeft(): Point {
    return new Point(this.left, this.top);
  }

  /**
   * Get the top right point of the rectangle.
   */
  get topRight(): Point {
    return new Point(this.right, this.top);
  }

  /**
   * Get the bottom right point of the rectangle.
   */
  get bottomRight(): Point {
    return new Point(this.right, this.bottom);
  }

  /**
   * Get the bottom left point of the rectangle.
   */
  get bottomLeft(): Point {
    return new Point(this.left, this.bottom);
  }

  get top(): number {
    return this._top;
  }

  get right(): number {
    return this._right;
  }

  get bottom(): number {
    return this._bottom;
  }

  get left(): number {
    return this._left;
  }

  /**
   * Get the width of the rectangle.
   */
  get width(): number {
    return this.right - this.left;
  }

  /**
   * Get the height of the rectangle.
   */
  get height(): number {
    return this.bottom - this.top;
  }

  /**
   * Validates a point to make sure it's suitable to be used as a corner of the rectangle.
   * @throws TypeError if not of type Point.
   */
  private validatePoint(point: Point): void {
    if (!(point instanceof Point)) {
      throw new TypeError("argument not of type Point");
    }
  }
}
