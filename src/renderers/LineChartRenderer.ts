import type LineChartState from "../states/LineChartState";
import Point from "../utils/Point";
import Rectangle from "../utils/Rectangle";
import RectangleMapper from "../utils/RectangleMapper";
import type Renderer from "./Renderer";

const MARGIN = 25;

export default class LineChartRenderer implements Renderer {
  private scale: RectangleMapper | null = null;
  private graphAreaBoundary: Rectangle | null = null;

  render(renderingContext: CanvasRenderingContext2D, chartState: LineChartState): void {
    const boundary: Rectangle = chartState.getBoundary();
    const pixelBoundary = new Rectangle(new Point(MARGIN + chartState.padding, chartState.padding), new Point(chartState.pixelWidth - chartState.padding, chartState.pixelHeight - MARGIN - chartState.padding));
    const pixelGraphAreaBoundary = new Rectangle(new Point(MARGIN, 0), new Point(chartState.pixelWidth, chartState.pixelHeight - MARGIN));
    this.scale = new RectangleMapper(boundary, pixelBoundary);
    this.graphAreaBoundary = this.scale.reverseMapRectangle(pixelGraphAreaBoundary);

    this.clear(renderingContext);
    this.drawOutline(renderingContext, chartState);
    this.drawLine(renderingContext, chartState);
    this.drawScale(renderingContext, chartState);
  }

  /**
   * Clear the entire rendering context.
   */
  private clear(renderingContext: CanvasRenderingContext2D): void {
    renderingContext.clearRect(0, 0, renderingContext.canvas.width, renderingContext.canvas.height);
  }

  /**
   * Draw the outline of the chart area. And an outline around the entire canvas.
   */
  private drawOutline(renderingContext: CanvasRenderingContext2D, chartState: LineChartState): void {
    renderingContext.beginPath();
    renderingContext.rect(0, 0, chartState.pixelWidth, chartState.pixelHeight);
    renderingContext.rect(MARGIN, 0, chartState.pixelWidth - MARGIN, chartState.pixelHeight - MARGIN);
    renderingContext.stroke();
  }

  /**
   * Draw the line connecting all points in the chart.
   */
  private drawLine(renderingContext: CanvasRenderingContext2D, chartState: LineChartState): void {
    const boundary: Rectangle = chartState.getBoundary();
    const rectangleMapper = new RectangleMapper(boundary, new Rectangle(new Point(MARGIN + chartState.padding, chartState.padding), new Point(chartState.pixelWidth - chartState.padding, chartState.pixelHeight - MARGIN - chartState.padding)));

    renderingContext.beginPath();
    for(const point of chartState.points) {
      const mappedPoint = rectangleMapper.map(point);
      renderingContext.lineTo(mappedPoint.x, mappedPoint.y);
    }
    renderingContext.stroke();
  }

  /**
   * Draw the scale along the x-axis.
   */
  private drawScale(renderingContext: CanvasRenderingContext2D, chartState: LineChartState): void {
    renderingContext.fillStyle = "black";
    renderingContext.font = "12px Arial";
    renderingContext.textAlign = "center";
    renderingContext.textBaseline = "middle";

    if(this.graphAreaBoundary === null || this.scale === null) {
      throw new Error("graph area boundary or scale not initialized");
    }

    const stepSize = chartState.scaleInterval;
    const scaleTickGeneratorX = this.getScaleTickPosition(this.graphAreaBoundary.topLeft.x, this.graphAreaBoundary.bottomRight.x);
    for(let xValue = scaleTickGeneratorX.next().value; xValue !== undefined; xValue = scaleTickGeneratorX.next().value) {
      const point = this.scale.map(new Point(xValue, this.graphAreaBoundary.bottomRight.y));
      renderingContext.fillText(xValue.toFixed(1), point.x, point.y + MARGIN * 0.5);
      renderingContext.beginPath();
      renderingContext.moveTo(point.x, point.y);
      renderingContext.lineTo(point.x, point.y + MARGIN * 0.2);
      renderingContext.stroke();
    }

    const scaleTickGeneratorY = this.getScaleTickPosition(this.graphAreaBoundary.bottomRight.y, this.graphAreaBoundary.topLeft.y);
    for(let yValue = scaleTickGeneratorY.next().value; yValue !== undefined; yValue = scaleTickGeneratorY.next().value) {
      const point = this.scale.map(new Point(this.graphAreaBoundary.topLeft.x, yValue));
      renderingContext.fillText(yValue.toFixed(1), point.x - MARGIN * 0.5, point.y);
      renderingContext.beginPath();
      renderingContext.moveTo(point.x, point.y);
      renderingContext.lineTo(point.x - MARGIN * 0.2, point.y);
      renderingContext.stroke();
    }
  }

  private* getScaleTickPosition(start: number, end: number): Generator<number> {
    const size = end - start;
    const interval = Math.pow(2, Math.floor(Math.log2(size / 2)) - 1);

    for(let i = Math.ceil(start / interval) * interval; i <= end; i+=interval) {
      yield i;
    }
  }
}