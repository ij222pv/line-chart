import Point from "./Point";

/**
 * A collection of points connected by straight line segments.
 */
export default class Polyline {
  points: Point[];

  constructor(points: Point[] = []) {
    this.points = points;
  }
  
  /**
   * Get the points in the polyline.
   * @returns The points in the polyline.
   */
  getPoints(): Point[] {
    return this.points;
  }
}