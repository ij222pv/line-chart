import type LineChartState from "../states/LineChartState";
import Point from "../utils/Point";
import Rectangle from "../utils/Rectangle";
import RectangleMapper from "../utils/RectangleMapper";
import type Renderer from "./Renderer";

export default class LineChartRenderer implements Renderer {
  render(renderingContext: CanvasRenderingContext2D, chartState: LineChartState): void {
    renderingContext.rect(0, 0, chartState.pixelWidth, chartState.pixelHeight);
    renderingContext.stroke();

    const boundary: Rectangle = chartState.getBoundary();

    const rectangleMapper = new RectangleMapper(boundary, new Rectangle(new Point(0, 0), new Point(chartState.pixelWidth, chartState.pixelHeight)));

    renderingContext.beginPath();
    for(const point of chartState.points) {
      const mappedPoint = rectangleMapper.map(point);
      renderingContext.lineTo(mappedPoint.x, mappedPoint.y);
    }
    renderingContext.stroke();
  }
}