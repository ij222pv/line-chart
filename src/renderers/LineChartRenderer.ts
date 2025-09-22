import type LineChartState from "../states/LineChartState";
import Point from "../utils/Point";
import type Polyline from "../utils/Polyline";
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
    for(const line of chartState.lines) {
      this.drawLine(renderingContext, chartState, line);
    }
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
  private drawLine(renderingContext: CanvasRenderingContext2D, chartState: LineChartState, line: Polyline): void {
    const boundary: Rectangle = chartState.getBoundary();
    const rectangleMapper = new RectangleMapper(boundary, new Rectangle(new Point(MARGIN + chartState.padding, chartState.padding), new Point(chartState.pixelWidth - chartState.padding, chartState.pixelHeight - MARGIN - chartState.padding)));

    renderingContext.beginPath();
    for(const point of line.getPoints()) {
      const mappedPoint = rectangleMapper.map(point);
      renderingContext.lineTo(mappedPoint.x, mappedPoint.y);
    }

    renderingContext.save();
    renderingContext.strokeStyle = "red";
    renderingContext.lineWidth = 2;
    renderingContext.lineCap = "round";
    renderingContext.lineJoin = "round";
    renderingContext.stroke();
    renderingContext.restore();
  }

  /**
   * Draw the scale along the x-axis.
   */
  private drawScale(renderingContext: CanvasRenderingContext2D, _chartState: LineChartState): void {
    renderingContext.fillStyle = "black";
    renderingContext.font = "12px Arial";
    renderingContext.textAlign = "center";
    renderingContext.textBaseline = "middle";

    if(this.graphAreaBoundary === null || this.scale === null) {
      throw new Error("graph area boundary or scale not initialized");
    }

    // const stepSize = chartState.scaleInterval;
    const scaleTickGeneratorX = this.getScaleTickPosition(this.graphAreaBoundary.topLeft.x, this.graphAreaBoundary.bottomRight.x);
    for(let xValue = scaleTickGeneratorX.next().value; xValue !== undefined; xValue = scaleTickGeneratorX.next().value) {
      const point = this.scale.map(new Point(xValue, this.graphAreaBoundary.bottomRight.y));
      renderingContext.fillText((Math.round(xValue * 10000) / 10000).toString(), point.x, point.y + MARGIN * 0.5);
      renderingContext.beginPath();
      renderingContext.moveTo(point.x, point.y);
      renderingContext.lineTo(point.x, point.y + MARGIN * 0.2);
      renderingContext.stroke();
    }

    const scaleTickGeneratorY = this.getScaleTickPosition(this.graphAreaBoundary.bottomRight.y, this.graphAreaBoundary.topLeft.y);
    for(let yValue = scaleTickGeneratorY.next().value; yValue !== undefined; yValue = scaleTickGeneratorY.next().value) {
      const point = this.scale.map(new Point(this.graphAreaBoundary.topLeft.x, yValue));
      renderingContext.fillText((Math.round(yValue * 10000) / 10000).toString(), point.x - MARGIN * 0.5, point.y);
      renderingContext.beginPath();
      renderingContext.moveTo(point.x, point.y);
      renderingContext.lineTo(point.x - MARGIN * 0.2, point.y);
      renderingContext.stroke();
    }
  }

  private* getScaleTickPosition(start: number, end: number): Generator<number> {
    const size = end - start;
    // An interval in the pattern 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, ...
    const interval = Math.pow(10, Math.floor(Math.log10(size / 5)));
    const interval2 = interval * 2;
    const interval5 = interval * 5;
    const goalInterval = size / 5;
    const intervals = [interval, interval2, interval5];
    const finalInterval = intervals.reduce((prev, curr) =>
      Math.abs(goalInterval - curr) < Math.abs(goalInterval - prev) ? curr : prev
    );

    for(let i = Math.ceil(start / finalInterval) * finalInterval; i <= end; i+=finalInterval) {
      yield i;
    }
  }
}