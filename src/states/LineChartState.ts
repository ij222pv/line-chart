import Point from "../utils/Point";
import type Polyline from "../utils/Polyline";
import Rectangle from "../utils/Rectangle";
import ChartState from "./ChartState";

export default class LineChartState extends ChartState {
  private _lines: Polyline[] = [];
  private _scaleInterval: number = 50;
  private _paddingX: number = 0;
  private _paddingY: number = 0;
  private _viewport: Rectangle | null = null;

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
    let topLeft = new Point(Infinity, -Infinity);
    let bottomRight = new Point(-Infinity, Infinity);

    for (const point of this.lines.flatMap((line) => line.points)) {
      topLeft = new Point(
        Math.min(point.x, topLeft.x),
        Math.max(point.y, topLeft.y),
      );
      bottomRight = new Point(
        Math.max(point.x, bottomRight.x),
        Math.min(point.y, bottomRight.y),
      );
    }

    return new Rectangle(topLeft, bottomRight);
  }

  public set viewport(viewport: Rectangle) {
    this._viewport = viewport;
  }

  public get viewport(): Rectangle {
    if (this._viewport === null) {
      return this.getBoundary();
    }

    return this._viewport;
  }

  public autoFit(options: { paddingX?: number; paddingY?: number } = {}): void {
    // TODO: use pixel padding instead of chart coordinate padding
    this.paddingX = options.paddingX ?? 0;
    this.paddingY = options.paddingY ?? 0;
    const boundary = this.getBoundary();
    this.viewport = boundary;
  }

  public set axisTickInterval(value: number) {
    if (typeof value !== "number" || value <= 0 || !Number.isFinite(value)) {
      throw new TypeError("scale interval must be a positive number");
    }

    this._scaleInterval = value;
  }

  public get axisTickInterval(): number {
    return this._scaleInterval;
  }

  public set paddingX(value: number) {
    if (typeof value !== "number" || value < 0 || !Number.isFinite(value)) {
      throw new TypeError("padding must be a non-negative number");
    }

    this._paddingX = value;
  }

  public get paddingX(): number {
    return this._paddingX;
  }

  public set paddingY(value: number) {
    if (typeof value !== "number" || value < 0 || !Number.isFinite(value)) {
      throw new TypeError("padding must be a non-negative number");
    }

    this._paddingY = value;
  }

  public get paddingY(): number {
    return this._paddingY;
  }
}
