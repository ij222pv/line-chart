import Point from "./Point";

export default class Rectangle {
  private _topLeft: Point = new Point(0, 0);
  private _bottomRight: Point = new Point(0, 0);
  
  constructor(topLeftPoint: Point, bottomRightPoint: Point) {
    this.topLeft = topLeftPoint;
    this.bottomRight = bottomRightPoint;
  }

  /**
   * Get the top left point of the rectangle.
   */
  get topLeft(): Point {
    return this._topLeft;
  }

  /**
   * Get the bottom right point of the rectangle.
   */
  get bottomRight(): Point {
    return this._bottomRight;
  }

  /**
   * Set the top left point of the rectangle.
   */
  set topLeft(point: Point) {
    this.validatePoint(point);
    this._topLeft = point;
  }

  /**
   * Set the bottom right point of the rectangle.
   */
  set bottomRight(point: Point) {
    this.validatePoint(point);
    this._bottomRight = point;
  }

  /**
   * Get the width of the rectangle.
   */
  get width(): number {
    return this.bottomRight.x - this.topLeft.x;
  }

  /**
   * Get the height of the rectangle.
   */
  get height(): number {
    return this.bottomRight.y - this.topLeft.y;
  }

  /**
   * Validates a point to make sure it's suitable to be used as a corner of the rectangle.
   * 
   * @throws TypeError if not of type Point.
   */
  private validatePoint(point: Point): void {
    if(!(point instanceof Point)) {
      throw new TypeError("argument not of type Point");
    }
  }
}