import Point from "./Point";

export default class Rectangle {
  private _top: number = 0;
  private _left: number = 0;
  private _right: number = 0;
  private _bottom: number = 0;
  
  constructor(topLeftPoint: Point, bottomRightPoint: Point) {
    this.topLeft = topLeftPoint;
    this.bottomRight = bottomRightPoint;
  }

  /**
   * Get the top left point of the rectangle.
   */
  get topLeft(): Point {
    return new Point(this.left, this.top);
  }

  /**
   * Set the top left point of the rectangle.
   */
  set topLeft(point: Point) {
    this.validatePoint(point);
    this.top = point.y;
    this.left = point.x;
  }

  /**
   * Get the top right point of the rectangle.
   */
  get topRight(): Point {
    return new Point(this.right, this.top);
  }

  /**
   * Set the top left point of the rectangle.
   */
  set topRight(point: Point) {
    this.validatePoint(point);
    this.top = point.y;
    this.right = point.x;
  }

  /**
   * Get the bottom right point of the rectangle.
   */
  get bottomRight(): Point {
    return new Point(this.right, this.bottom);
  }

  /**
   * Set the bottom right point of the rectangle.
   */
  set bottomRight(point: Point) {
    this.validatePoint(point);
    this.bottom = point.y;
    this.right = point.x;
  }

  /**
   * Get the bottom left point of the rectangle.
   */
  get bottomLeft(): Point {
    return new Point(this.left, this.bottom);
  }

  /**
   * Set the bottom left point of the rectangle.
   */
  set bottomLeft(point: Point) {
    this.validatePoint(point);
    this.bottom = point.y;
    this.left = point.x;
  }

  get top(): number {
    return this._top;
  }

  set top(value: number) {
    this.validateNumber(value);
    this._top = value;
  }

  get right(): number {
    return this._right;
  }

  set right(value: number) {
    this.validateNumber(value);
    this._right = value;
  }

  get bottom(): number {
    return this._bottom;
  }

  set bottom(value: number) {
    this.validateNumber(value);
    this._bottom = value;
  }

  get left(): number {
    return this._left;
  }

  set left(value: number) {
    this.validateNumber(value);
    this._left = value;
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
   * Validates that the argument is a number.
   * @throws TypeError if not a number.
   */
  private validateNumber(value: number): void {
    if (typeof value !== "number") {
      throw new TypeError("argument must be number");
    }
  }

  /**
   * Validates a point to make sure it's suitable to be used as a corner of the rectangle.
   * @throws TypeError if not of type Point.
   */
  private validatePoint(point: Point): void {
    if(!(point instanceof Point)) {
      throw new TypeError("argument not of type Point");
    }
  }
}