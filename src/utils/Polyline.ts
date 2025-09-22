import Color from "./Color";
import Point from "./Point";

/**
 * A collection of points connected by straight line segments.
 */
export default class Polyline {
  private points: Point[];
  private color: Color = new Color();

  constructor(points: Point[] = []) {
    for(const point of points) {
      if(!(point instanceof Point)) {
        throw new TypeError("input array contains non-Point element");
      }
    }

    this.points = Array.from(points);
  }

  /**
   * Get the points in the polyline.
   * @returns The points in the polyline.
   */
  getPoints(): Point[] {
    return this.points;
  }

  /**
   * Sets the color of the polyline.
   */
  setColor(color: Color): this {
    this.color = color;

    return this;
  }

  getColor(): Color {
    return this.color;
  }
}