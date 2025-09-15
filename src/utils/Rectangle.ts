import Point from "./Point";

export default class Rectangle {
  private _topLeft: Point = new Point(0, 0);
  private _bottomRight: Point = new Point(0, 0);
  
  constructor(topLeftPoint: Point, bottomRightPoint: Point) {
    this.topLeft = topLeftPoint;
    this.bottomRight = bottomRightPoint;
  }

  get topLeft() {
    return this._topLeft;
  }

  get bottomRight() {
    return this._bottomRight;
  }

  set topLeft(point: Point) {
    this.validatePoint(point);
    this._topLeft = point;
  }

  set bottomRight(point: Point) {
    this.validatePoint(point);
    this._bottomRight = point;
  }

  get width() {
    return this.bottomRight.x - this.topLeft.x;
  }

  get height() {
    return this.bottomRight.y - this.topLeft.y;
  }

  private validatePoint(point: Point): void {
    if(!(point instanceof Point)) {
      throw new TypeError("argument not of type Point");
    }
  }
}