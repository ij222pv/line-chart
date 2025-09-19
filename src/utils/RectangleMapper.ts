import Point from "./Point";
import Rectangle from "./Rectangle";

/**
 * Maps points from the reference frame of one rectangle to another.
 */
export default class RectangleMapper {
  private from: Rectangle;
  private to: Rectangle;

  constructor(from: Rectangle, to: Rectangle) {
    this.from = from;
    this.to = to;
  }

  /**
   * Maps a point from the reference frame of one rectangle to another. The point
   * will keep it's relative position in the new rectangle.
   * For example, a point in the center of the source
   * rectangle will be mapped to the center of the target
   * rectangle.
   */
  map(point: Point): Point {
    const foo = new Point(
      point.x - this.from.topLeft.x,
      point.y - this.from.topLeft.y
    );
    const bar = new Point(
      (foo.x / this.from.width) * this.to.width,
      (foo.y / this.from.height) * this.to.height
    );
    const baz = new Point(bar.x + this.to.topLeft.x, bar.y + this.to.topLeft.y);

    return baz;
  }

  /**
   * Maps a rectangle from one reference frame to another. The rectangle
   * will keep it's relative position in the new rectangle.
   * For example, a rectangle half the size of the source
   * rectangle will be mapped to a rectangle half the size of the target
   * rectangle.
   */
  mapRectangle(rectangle: Rectangle): Rectangle {
    const topLeft = this.map(rectangle.topLeft);
    const bottomRight = this.map(rectangle.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }
}
