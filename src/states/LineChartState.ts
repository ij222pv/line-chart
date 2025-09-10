import Point from "../utils/Point";
import ChartState from "./ChartState";

export default class LineChartState extends ChartState {
  private _points: Point[] = [];

  constructor(points?: Point[]) {
    super();

    if (points) {
      this.setPoints(points);
    }
  }

  public setPoints(points: Point[]) {
    for(const point of points) {
      if(!(point instanceof Point)) {
        throw new TypeError("input array contains element of wrong type");
      }
    }

    const sortedPoints = points.toSorted((a: Point, b: Point) => {
      return a.x - b.x;
    });

    sortedPoints.forEach((point) => {
      Object.freeze(point);
    });

    this._points = sortedPoints;
  }

  get points() {
    return Array.from(this._points);
  }
}