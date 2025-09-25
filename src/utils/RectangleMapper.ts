import LineSegment from "./LineSegment";
import Point from "./Point";
import Rectangle from "./Rectangle";

/**
 * Maps points from the reference frame of one rectangle to another.
 */
export default class RectangleMapper {
  private source: Rectangle;
  private target: Rectangle;

  constructor(from: Rectangle, to: Rectangle) {
    this.source = from;
    this.target = to;
  }

  /**
   * Maps a point from the reference frame of one rectangle to another. The point
   * will keep its relative position in the new rectangle.
   * For example, a point in the center of the source
   * rectangle will be mapped to the center of the target
   * rectangle.
   */
  mapPoint(point: Point): Point {
    const relativeToSource = new Point(
      point.x - this.source.topLeft.x,
      point.y - this.source.topLeft.y,
    );
    const scaledToTarget = new Point(
      (relativeToSource.x / this.source.width) * this.target.width,
      (relativeToSource.y / this.source.height) * this.target.height,
    );
    const mappedToTarget = new Point(
      scaledToTarget.x + this.target.topLeft.x,
      scaledToTarget.y + this.target.topLeft.y,
    );

    return mappedToTarget;
  }

  /**
   * Maps a point relative to the target rectangle back to the source rectangle.
   */
  reverseMapPoint(point: Point): Point {
    const relativeToSource = new Point(
      point.x - this.target.topLeft.x,
      point.y - this.target.topLeft.y,
    );
    const scaledToTarget = new Point(
      (relativeToSource.x / this.target.width) * this.source.width,
      (relativeToSource.y / this.target.height) * this.source.height,
    );
    const mappedToTarget = new Point(
      scaledToTarget.x + this.source.topLeft.x,
      scaledToTarget.y + this.source.topLeft.y,
    );

    return mappedToTarget;
  }

  /**
   * Maps a rectangle from one reference frame to another. The rectangle
   * will keep its relative position in the new rectangle.
   * For example, a rectangle half the size of the source
   * rectangle will be mapped to a rectangle half the size of the target
   * rectangle.
   */
  mapRectangle(rectangle: Rectangle): Rectangle {
    const topLeft = this.mapPoint(rectangle.topLeft);
    const bottomRight = this.mapPoint(rectangle.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }

  /**
   * Maps a rectangle from the reference frame of the target rectangle back to the source rectangle.
   */
  reverseMapRectangle(rectangle: Rectangle): Rectangle {
    const topLeft = this.reverseMapPoint(rectangle.topLeft);
    const bottomRight = this.reverseMapPoint(rectangle.bottomRight);
    return new Rectangle(topLeft, bottomRight);
  }

  /**
   * Maps a line segment from one reference frame to another. The line segment
   * will keep its relative position in the new rectangle.
   */
  mapLineSegment(line: LineSegment): LineSegment {
    return new LineSegment(this.mapPoint(line.start), this.mapPoint(line.end));
  }

  /**
   * Maps a line segment from the reference frame of the target rectangle back to the source rectangle.
   */
  reverseMapLineSegment(line: LineSegment): LineSegment {
    return new LineSegment(
      this.reverseMapPoint(line.start),
      this.reverseMapPoint(line.end),
    );
  }
}
