export default class Point {
  private _x: number = 0;
  private _y: number = 0;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(value) {
    this.validateNumber(value);
    this._x = value;
  }

  set y(value) {
    this.validateNumber(value);
    this._y = value;
  }

  private validateNumber(value: number): void {
    if (typeof value !== "number") {
      throw new TypeError("argument must be number");
    }
  }
}