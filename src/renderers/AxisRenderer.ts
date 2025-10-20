import { Axis } from "../Axis";
import {
  LABEL_FONT_FAMILY,
  LABEL_OFFSET,
  MARGIN,
  TICK_LENGTH,
} from "../constants";
import type LineChartState from "../states/LineChartState";
import Point from "../model/Point";
import AxisTickGenerator from "./AxisTickGenerator";
import type Renderer from "./Renderer";
import RenderingUtilities from "./RenderingUtilities";

export default class AxisRenderer implements Renderer {
  private readonly renderingUtilities: RenderingUtilities;

  public constructor(
    private renderingContext: CanvasRenderingContext2D,
    private chartState: LineChartState,
  ) {
    this.renderingUtilities = new RenderingUtilities(renderingContext);
  }

  public render(): void {
    this.drawAxis(
      new AxisTickGenerator(Axis.X, this.chartState).generate(),
      Axis.X,
    );

    this.drawAxis(
      new AxisTickGenerator(Axis.Y, this.chartState).generate(),
      Axis.Y,
    );
  }

  /**
   * Draw the axis markings and numbers along one axis.
   */
  private drawAxis(tickPositionIterator: Iterator<number>, axis: Axis): void {
    for (
      let i = tickPositionIterator.next().value;
      i !== undefined;
      i = tickPositionIterator.next().value
    ) {
      this.renderingUtilities.resetStyle();
      this.drawTickAndLabel(i, axis);
    }
  }

  private drawTickAndLabel(value: number, axis: Axis): void {
    const tickPosition = this.getTickPosition(value, axis);
    this.drawTick(tickPosition, axis);
    const labelPosition = this.getTickLabelPosition(tickPosition, axis);
    const label: string = this.numberToString(value);
    this.setAxisLabelStyle(label, axis);
    this.drawTickLabel(labelPosition, label);
  }

  private setAxisLabelStyle(label: string, axis: Axis): void {
    this.setLabelFont(label, MARGIN - LABEL_OFFSET);
    this.renderingContext.fillStyle = "black";
    this.renderingContext.textAlign = axis === Axis.X ? "center" : "right";
    this.renderingContext.textBaseline = axis === Axis.X ? "top" : "middle";
  }

  private setLabelFont(text: string, maxWidth: number): void {
    let fontSize = 13; // The biggest font size to try.
    this.renderingContext.font = `${fontSize}px ${LABEL_FONT_FAMILY}`;

    while (this.renderingContext.measureText(text).width > maxWidth) {
      fontSize -= 0.1;
      this.renderingContext.font = `${fontSize}px ${LABEL_FONT_FAMILY}`;
    }
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
    this.renderingUtilities.drawLineBetweenPoints(basePoint, secondPoint);
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
}
