export default class Point {
  private _x: number = 0;
  private _y: number = 0;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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
   * Set the x coordinate of the point.
   */
  set x(value) {
    this.validateNumber(value);
    this._x = value;
  }

  /**
   * Set the y coordinate of the point.
   */
  set y(value) {
    this.validateNumber(value);
    this._y = value;
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
