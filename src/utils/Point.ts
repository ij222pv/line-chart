export default class Point {
  private _x: number = 0;
  private _y: number = 0;

  constructor(x: number, y: number) {
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
  private validateNumber(value: number): void {
    if (typeof value !== "number") {
      throw new TypeError("argument must be number");
    }
  }
}
