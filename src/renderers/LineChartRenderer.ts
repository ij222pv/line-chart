import type LineChartState from "../states/LineChartState";
import LineSegment from "../utils/LineSegment";
import Point from "../utils/Point";
import type Polyline from "../utils/Polyline";
import Range from "../utils/Range";
import type Renderer from "./Renderer";

const MARGIN = 35;
const TICK_LENGTH = MARGIN * 0.2;
const LABEL_OFFSET = TICK_LENGTH + MARGIN * 0.1;
enum Axis {
  X,
  Y,
}

export default class LineChartRenderer implements Renderer {
  constructor(
    private renderingContext: CanvasRenderingContext2D,
    private chartState: LineChartState,
  ) {}

  public render(): void {
    this.clear();
    this.drawGrid();
    this.drawOutline();
    this.drawLines();
    this.drawAxes();
  }

  /**
   * Clear the entire rendering context.
   */
  private clear(): void {
    this.renderingContext.fillStyle = "white";
    this.renderingContext.fillRect(
      0,
      0,
      this.renderingContext.canvas.width,
      this.renderingContext.canvas.height,
    );
  }

  /**
   * Draw the outline of the chart area. And an outline around the entire canvas.
   */
  private drawOutline(): void {
    this.renderingContext.beginPath();
    this.renderingContext.rect(
      0,
      0,
      this.chartState.canvasWidth,
      this.chartState.canvasHeight,
    );
    this.renderingContext.rect(
      MARGIN,
      0,
      this.chartState.canvasWidth - MARGIN,
      this.chartState.canvasHeight - MARGIN,
    );
    this.renderingContext.stroke();
  }

  private drawLines(): void {
    for (const line of this.chartState.lines) {
      this.drawLine(line);
    }
  }

  /**
   * Draw the line connecting all points in the chart.
   */
  private drawLine(line: Polyline): void {
    this.renderingContext.beginPath();
    for (const point of line.points) {
      const mappedPoint = this.chartState.chartToScreenMapper!.mapPoint(point);
      this.renderingContext.lineTo(mappedPoint.x, mappedPoint.y);
    }

    this.renderingContext.save();
    this.renderingContext.strokeStyle = line.color.toString();
    this.renderingContext.lineWidth = line.thickness;
    this.renderingContext.lineCap = "round";
    this.renderingContext.lineJoin = "round";
    this.renderingContext.stroke();
    this.renderingContext.restore();
  }

  /**
   * Draw the axes along the X and Y axis.
   */
  private drawAxes(): void {
    // X-axis
    const axisTickGeneratorX = this.generateTickPositions(
      new Range(
        this.chartState.viewport!.left,
        this.chartState.viewport!.right,
      ),
      this.chartState.pixelViewport!.width / this.chartState.axisTickInterval,
    );
    this.drawAxis(axisTickGeneratorX, Axis.X);

    // Y-axis
    const axisTickGeneratorY = this.generateTickPositions(
      new Range(
        this.chartState.viewport!.bottom,
        this.chartState.viewport!.top,
      ),
      this.chartState.pixelViewport!.height / this.chartState.axisTickInterval,
    );
    this.drawAxis(axisTickGeneratorY, Axis.Y);
  }

  /**
   * Draw the axis markings and numbers along one axis.
   */
  private drawAxis(tickPositionIterator: Iterator<number>, axis: Axis): void {
    this.setAxisLabelStyle(axis);

    for (
      let i = tickPositionIterator.next().value;
      i !== undefined;
      i = tickPositionIterator.next().value
    ) {
      this.drawTickAndLabel(i, axis);
    }
  }

  private setAxisLabelStyle(axis: Axis): void {
    this.renderingContext.fillStyle = "black";
    this.renderingContext.font = "12px Arial";
    this.renderingContext.textAlign = axis === Axis.X ? "center" : "right";
    this.renderingContext.textBaseline = axis === Axis.X ? "top" : "middle";
  }

  private drawTickAndLabel(value: number, axis: Axis): void {
    const tickPosition = this.getTickPosition(value, axis);
    this.drawTick(tickPosition, axis);
    const labelPosition = this.getTickLabelPosition(tickPosition, axis);
    this.drawTickLabel(labelPosition, this.numberToString(value));
  }

  private getTickPosition(value: number, axis: Axis): Point {
    let point: Point;
    if (axis === Axis.X) {
      point = new Point(value, this.chartState.viewport!.bottom);
    } else {
      point = new Point(this.chartState.viewport!.left, value);
    }
    const mappedPoint = this.chartState.chartToScreenMapper!.mapPoint(point);
    return mappedPoint;
  }

  private drawTick(basePoint: Point, axis: Axis): void {
    let secondPoint: Point;
    if (axis === Axis.X) {
      secondPoint = new Point(basePoint.x, basePoint.y + TICK_LENGTH);
    } else {
      secondPoint = new Point(basePoint.x - TICK_LENGTH, basePoint.y);
    }
    this.drawLineBetweenPoints(basePoint, secondPoint);
  }

  private getTickLabelPosition(tickPosition: Point, axis: Axis): Point {
    let labelPosition: Point;
    if (axis === Axis.X) {
      labelPosition = new Point(tickPosition.x, tickPosition.y + LABEL_OFFSET);
    } else {
      labelPosition = new Point(tickPosition.x - LABEL_OFFSET, tickPosition.y);
    }
    return labelPosition;
  }

  private numberToString(value: number): string {
    // Round to avoid floating point precision issues. Such as -0.6 being displayed as -0.5999999999999992.
    const rounded = this.roundToDecimalPlaces(value, 10);
    return rounded.toString();
  }

  private roundToDecimalPlaces(value: number, decimalPlaces: number): number {
    return parseFloat(value.toFixed(decimalPlaces));
  }

  private drawTickLabel(position: Point, label: string): void {
    this.renderingContext.fillText(label, position.x, position.y);
  }

  private drawLineBetweenPoints(point1: Point, point2: Point): void {
    this.renderingContext.beginPath();
    this.renderingContext.moveTo(point1.x, point1.y);
    this.renderingContext.lineTo(point2.x, point2.y);
    this.renderingContext.stroke();
  }

  private drawLineSegment(line: LineSegment): void {
    this.drawLineBetweenPoints(line.start, line.end);
  }

  /**
   * A generator function to yield the positions of axis ticks along an axis.
   */
  private *generateTickPositions(
    range: Range,
    goalNumberOfTicks: number,
  ): Generator<number> {
    const targetInterval = range.length / goalNumberOfTicks;
    const finalInterval = this.roundTickInterval(targetInterval);

    for (
      let i = Math.ceil(range.start / finalInterval) * finalInterval;
      i <= range.end;
      i += finalInterval
    ) {
      yield i;
    }
  }

  /**
   * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
   */
  private roundTickInterval(value: number): number {
    const closestPowerOfTen = Math.pow(10, Math.floor(Math.log10(value)));
    const intervals = [
      closestPowerOfTen,
      closestPowerOfTen * 2,
      closestPowerOfTen * 5,
    ];
    const finalInterval = intervals.reduce((previous, current) => {
      if (Math.abs(value - current) < Math.abs(value - previous)) {
        return current;
      } else {
        return previous;
      }
    });

    return finalInterval;
  }

  private drawGrid(): void {
    const axisTickGeneratorX = this.generateTickPositions(
      new Range(
        this.chartState.viewport!.left,
        this.chartState.viewport!.right,
      ),
      this.chartState.pixelViewport!.width / this.chartState.axisTickInterval,
    );
    this.drawGridLines(axisTickGeneratorX, Axis.X);

    const axisTickGeneratorY = this.generateTickPositions(
      new Range(
        this.chartState.viewport!.bottom,
        this.chartState.viewport!.top,
      ),
      this.chartState.pixelViewport!.height / this.chartState.axisTickInterval,
    );
    this.drawGridLines(axisTickGeneratorY, Axis.Y);
  }

  private drawGridLines(
    tickPositionIterator: Iterator<number>,
    axis: Axis,
  ): void {
    for (
      let i = tickPositionIterator.next().value;
      i !== undefined;
      i = tickPositionIterator.next().value
    ) {
      this.drawGridLine(i, axis);
    }
  }

  private drawGridLine(value: number, axis: Axis): void {
    this.renderingContext.save();
    this.renderingContext.strokeStyle = "#e0e0e0";

    let line: LineSegment;
    if (axis === Axis.X) {
      line = new LineSegment(
        new Point(value, this.chartState.viewport!.bottom),
        new Point(value, this.chartState.viewport!.top),
      );
    } else {
      line = new LineSegment(
        new Point(this.chartState.viewport!.left, value),
        new Point(this.chartState.viewport!.right, value),
      );
    }
    const mappedLine =
      this.chartState.chartToScreenMapper!.mapLineSegment(line);
    this.drawLineSegment(mappedLine);

    this.renderingContext.restore();
  }
}
