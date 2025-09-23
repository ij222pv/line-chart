import LineSegment from "./LineSegment";
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
   * will keep its relative position in the new rectangle.
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
   * Maps a point relative to the target rectangle back to the source rectangle.
   */
  reverseMap(point: Point): Point {
    const foo = new Point(
      point.x - this.to.topLeft.x,
      point.y - this.to.topLeft.y
    );
    const bar = new Point(
      (foo.x / this.to.width) * this.from.width,
      (foo.y / this.to.height) * this.from.height
    );
    const baz = new Point(
      bar.x + this.from.topLeft.x,
      bar.y + this.from.topLeft.y
    );

    return baz;
  }

  /**
   * Maps a rectangle from one reference frame to another. The rectangle
   * will keep its relative position in the new rectangle.
   * For example, a rectangle half the size of the source
   * rectangle will be mapped to a rectangle half the size of the target
   * rectangle.
   */
  mapRectangle(rectangle: Rectangle): Rectangle {
    const topLeft = this.map(rectangle.topLeft);
    const bottomRight = this.map(rectangle.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }

  /**
   * Maps a rectangle from the reference frame of the target rectangle back to the source rectangle.
   */
  reverseMapRectangle(rectangle: Rectangle): Rectangle {
    const topLeft = this.reverseMap(rectangle.topLeft);
    const bottomRight = this.reverseMap(rectangle.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }

  /**
   * Maps a line segment from one reference frame to another. The line segment
   * will keep its relative position in the new rectangle.
   */
  mapLineSegment(line: LineSegment): LineSegment {
    return new LineSegment(this.map(line.start), this.map(line.end));
  }

  /**
   * Maps a line segment from the reference frame of the target rectangle back to the source rectangle.
   */
  reverseMapLineSegment(line: LineSegment): LineSegment {
    return new LineSegment(
      this.reverseMap(line.start),
      this.reverseMap(line.end)
    );
  }
}
