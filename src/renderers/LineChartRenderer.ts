import type LineChartState from "../states/LineChartState";
import Point from "../utils/Point";
import Rectangle from "../utils/Rectangle";
import RectangleMapper from "../utils/RectangleMapper";
import type Renderer from "./Renderer";

const MARGIN = 25;

export default class LineChartRenderer implements Renderer {
  render(renderingContext: CanvasRenderingContext2D, chartState: LineChartState): void {
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
    const rectangleMapper = new RectangleMapper(boundary, new Rectangle(new Point(MARGIN, 0), new Point(chartState.pixelWidth, chartState.pixelHeight - MARGIN)));

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
    const boundary: Rectangle = chartState.getBoundary();
    const rectangleMapper = new RectangleMapper(boundary, new Rectangle(new Point(MARGIN, 0), new Point(chartState.pixelWidth, chartState.pixelHeight - MARGIN)));

    renderingContext.fillStyle = "black";
    renderingContext.font = "12px Arial";
    renderingContext.textAlign = "center";
    renderingContext.textBaseline = "middle";

    const stepSize = chartState.scaleInterval;
    for(let xValue = boundary.topLeft.x; xValue <= boundary.bottomRight.x; xValue+=stepSize) {
      const mappedX = rectangleMapper.map(new Point(xValue, 0)).x;

      renderingContext.fillText(xValue.toFixed(1), mappedX, chartState.pixelHeight - MARGIN / 2);
      renderingContext.beginPath();
      renderingContext.moveTo(mappedX, chartState.pixelHeight - MARGIN);
      renderingContext.lineTo(mappedX, chartState.pixelHeight - MARGIN * 3 / 4);
      renderingContext.stroke();
    }

    for(let yValue = boundary.bottomRight.y; yValue <= boundary.topLeft.y; yValue+=stepSize) {
      const mappedY = rectangleMapper.map(new Point(0, yValue)).y;
      
      renderingContext.fillText(yValue.toFixed(1), MARGIN / 2, mappedY);
      renderingContext.beginPath();
      renderingContext.moveTo(MARGIN, mappedY);
      renderingContext.lineTo(MARGIN * 3 / 4, mappedY);
      renderingContext.stroke();
    }
  }
}