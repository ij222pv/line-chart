import type LineChartState from "../states/LineChartState";
import type Polyline from "../utils/Polyline";
import type Renderer from "./Renderer";
import RenderingUtilities from "./RenderingUtilities";

export default class LineRenderer implements Renderer {
  private readonly renderingUtilities: RenderingUtilities;

  public constructor(
    private renderingContext: CanvasRenderingContext2D,
    private chartState: LineChartState,
  ) {
    this.renderingUtilities = new RenderingUtilities(renderingContext);
  }

  public render(): void {
    for (const line of this.chartState.lines) {
      this.drawLine(line);
    }
  }

  /**
   * Draw a line in the chart.
   */
  private drawLine(line: Polyline): void {
    this.setChartLineStyle(line);
    this.renderingContext.beginPath();
    for (const point of line.points) {
      const mappedPoint = this.chartState.chartToScreenMapper!.mapPoint(point);
      this.renderingContext.lineTo(mappedPoint.x, mappedPoint.y);
    }
    this.renderingContext.stroke();
  }

  private setChartLineStyle(line: Polyline): void {
    this.renderingUtilities.resetStyle();
    this.renderingContext.strokeStyle = line.color.toString();
    this.renderingContext.lineWidth = line.thickness;
    this.renderingContext.lineCap = "round";
    this.renderingContext.lineJoin = "round";
  }
}
