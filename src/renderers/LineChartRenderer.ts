import type LineChartState from "../states/LineChartState";
import type Renderer from "./Renderer";

export default class LineChartRenderer implements Renderer {
  render(renderingContext: CanvasRenderingContext2D, chartState: LineChartState): void {
    renderingContext.rect(0, 0, chartState.pixelWidth, chartState.pixelHeight);
    renderingContext.stroke();

    renderingContext.beginPath();
    for(const point of chartState.points) {
      renderingContext.lineTo(point.x, point.y);
    }
    renderingContext.stroke();
  }
}