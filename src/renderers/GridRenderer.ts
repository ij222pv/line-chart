import { Axis } from "../Axis";
import type LineChartState from "../states/LineChartState";
import LineSegment from "../model/LineSegment";
import Point from "../model/Point";
import AxisTickGenerator from "./AxisTickGenerator";
import type Renderer from "./Renderer";
import RenderingUtilities from "./RenderingUtilities";

export default class GridRenderer implements Renderer {
  private readonly renderingUtilities: RenderingUtilities;

  public constructor(
    private renderingContext: CanvasRenderingContext2D,
    private chartState: LineChartState,
  ) {
    this.renderingUtilities = new RenderingUtilities(renderingContext);
  }

  public render(): void {
    this.drawGridLines(
      new AxisTickGenerator(Axis.X, this.chartState).generate(),
      Axis.X,
    );

    this.drawGridLines(
      new AxisTickGenerator(Axis.Y, this.chartState).generate(),
      Axis.Y,
    );
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
    const pixelLine = this.getPixelGridLineSegment(value, axis);
    this.setGridLineStyle();
    this.drawLineSegment(pixelLine);
  }

  private getPixelGridLineSegment(value: number, axis: Axis): LineSegment {
    const line = this.getGridLineSegment(value, axis);
    return this.chartState.chartToScreenMapper.mapLineSegment(line);
  }

  private getGridLineSegment(value: number, axis: Axis): LineSegment {
    if (axis === Axis.X) {
      return this.getGridLineSegmentOnX(value);
    } else if (axis === Axis.Y) {
      return this.getGridLineSegmentOnY(value);
    }
    throw new TypeError("invalid axis");
  }

  private getGridLineSegmentOnX(value: number): LineSegment {
    return new LineSegment(
      new Point(value, this.chartState.viewport!.bottom),
      new Point(value, this.chartState.viewport!.top),
    );
  }

  private getGridLineSegmentOnY(value: number): LineSegment {
    return new LineSegment(
      new Point(this.chartState.viewport!.left, value),
      new Point(this.chartState.viewport!.right, value),
    );
  }

  private setGridLineStyle(): void {
    this.renderingUtilities.resetStyle();
    this.renderingContext.strokeStyle = "#e0e0e0";
  }

  private drawLineSegment(line: LineSegment): void {
    this.renderingUtilities.drawLineBetweenPoints(line.start, line.end);
  }
}
