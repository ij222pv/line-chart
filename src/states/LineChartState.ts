import Point from "../utils/Point";
import Rectangle from "../utils/Rectangle";
import ChartState from "./ChartState";

export default class LineChartState extends ChartState {
  private _points: Point[] = [];
  private _scaleInterval: number = 1;

  constructor(points?: Point[]) {
    super();

    if (points) {
      this.setPoints(points);
    }
  }

  /**
   * Set the points in the line chart to render.
   */
  public setPoints(points: Point[]): void {
    for(const point of points) {
      if(!(point instanceof Point)) {
        throw new TypeError("input array contains element of wrong type");
      }
    }

    const sortedPoints = points.toSorted((a: Point, b: Point): number => {
      return a.x - b.x;
    });

    sortedPoints.forEach((point) => {
      Object.freeze(point);
    });

    this._points = sortedPoints;
  }

  /**
   * Get a copy of the points in the line chart.
   */
  get points(): Point[] {
    return Array.from(this._points);
  }

  /**
   * Finds and returns the boundary rectangle enclosing all points in the line chart.
   * @returns A rectangle completely enclosing all points in the line chart.
   */
  public getBoundary(): Rectangle {
    const topLeft = new Point(Infinity, -Infinity);
    const bottomRight = new Point(-Infinity, Infinity);

    for(const point of this.points) {
      topLeft.x = Math.min(point.x, topLeft.x);
      topLeft.y = Math.max(point.y, topLeft.y);
      bottomRight.x = Math.max(point.x, bottomRight.x);
      bottomRight.y = Math.min(point.y, bottomRight.y);
    }

    return new Rectangle(topLeft, bottomRight);
  }

  public set scaleInterval(value: number) {
    if (typeof value !== "number" || value <= 0) {
      throw new TypeError("scale interval must be a positive number");
    }

    this._scaleInterval = value;
  }

  public get scaleInterval(): number {
    return this._scaleInterval;
  }
}