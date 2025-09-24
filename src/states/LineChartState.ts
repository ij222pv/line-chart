import Point from "../utils/Point";
import type Polyline from "../utils/Polyline";
import Rectangle from "../utils/Rectangle";
import ChartState from "./ChartState";

export default class LineChartState extends ChartState {
  private _lines: Polyline[] = [];
  private _scaleInterval: number = 1;
  private _padding: number = 25;

  constructor() {
    super();
  }

  /**
   * Set the points in the line chart to render.
   */
  public addLine(line: Polyline): void {
    this._lines.push(line);
  }

  public clearLines(): void {
    this._lines = [];
  }

  public get lines(): Polyline[] {
    return this._lines;
  }

  /**
   * Finds and returns the boundary rectangle enclosing all points in the line chart.
   * @returns A rectangle completely enclosing all points in the line chart.
   */
  public getBoundary(): Rectangle {
    const topLeft = new Point(Infinity, -Infinity);
    const bottomRight = new Point(-Infinity, Infinity);

    for (const point of this.lines.flatMap((line) => line.getPoints())) {
      topLeft.x = Math.min(point.x, topLeft.x);
      topLeft.y = Math.max(point.y, topLeft.y);
      bottomRight.x = Math.max(point.x, bottomRight.x);
      bottomRight.y = Math.min(point.y, bottomRight.y);
    }

    return new Rectangle(topLeft, bottomRight);
  }

  public set axisTickInterval(value: number) {
    if (typeof value !== "number" || value <= 0) {
      throw new TypeError("scale interval must be a positive number");
    }

    this._scaleInterval = value;
  }

  public get axisTickInterval(): number {
    return this._scaleInterval;
  }

  public get padding(): number {
    return this._padding;
  }
}
