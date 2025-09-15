import Point from "./Point";
import type Rectangle from "./Rectangle";

export default class RectangleMapper {
  private from: Rectangle;
  private to: Rectangle;

  constructor(from: Rectangle, to: Rectangle) {
    this.from = from;
    this.to = to;
  }

  map(point: Point): Point {
    const foo = new Point(point.x - this.from.topLeft.x, point.y - this.from.topLeft.y);
    const bar = new Point(foo.x / this.from.width * this.to.width, foo.y / this.from.height * this.to.height);
    const baz = new Point(bar.x + this.to.topLeft.x, bar.y + this.to.topLeft.y);

    return baz;
  }
}