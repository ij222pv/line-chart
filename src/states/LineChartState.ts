import Point from "../utils/Point";
import type Polyline from "../utils/Polyline";
import Rectangle from "../utils/Rectangle";
import RectangleMapper from "../utils/RectangleMapper";
import ChartState from "./ChartState";

const MARGIN = 35;

export default class LineChartState extends ChartState {
  private _lines: Polyline[] = [];
  private _scaleInterval: number = 50;
  private _paddingX: number = 0;
  private _paddingY: number = 0;
  private _viewport: Rectangle | null = null;
  private _boundingBoxOfLines: Rectangle = this.calculateBoundingBoxOfLines();

  constructor() {
    super();
  }

  /**
   * Set the points in the line chart to render.
   */
  public addLine(line: Polyline): void {
    this._lines.push(line);
    this._boundingBoxOfLines = this.calculateBoundingBoxOfLines();
  }

  public clearLines(): void {
    this._lines = [];
    this._boundingBoxOfLines = this.calculateBoundingBoxOfLines();
  }

  private calculateBoundingBoxOfLines(): Rectangle {
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

  public get lines(): Polyline[] {
    return this._lines;
  }

  public get boundingBoxOfLines(): Rectangle {
    return this._boundingBoxOfLines;
  }

  public set viewport(viewport: Rectangle) {
    this._viewport = viewport;
  }

  public get viewport(): Rectangle {
    if (this._viewport === null) {
      this.autoFit();
    }

    return this._viewport!;
  }

  public autoFit(options: { paddingX?: number; paddingY?: number } = {}): void {
    this.paddingX = options.paddingX ?? 0;
    this.paddingY = options.paddingY ?? 0;
    this.viewport = this.chartToScreenMapper.reverseMapRectangle(
      this.pixelViewport,
    );
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

  public get pixelViewportMinusPadding() {
    const left = MARGIN + this.paddingX;
    const top = this.paddingY;
    const right = this.canvasWidth - this.paddingX;
    const bottom = this.canvasHeight - MARGIN - this.paddingY;
    return new Rectangle(new Point(left, top), new Point(right, bottom));
  }

  public get pixelViewport() {
    const left = MARGIN;
    const top = 0;
    const right = this.canvasWidth;
    const bottom = this.canvasHeight - MARGIN;
    return new Rectangle(new Point(left, top), new Point(right, bottom));
  }

  public get chartToScreenMapper(): RectangleMapper {
    return new RectangleMapper(
      this.boundingBoxOfLines,
      this.pixelViewportMinusPadding,
    );
  }
}
