import type ChartState from "../states/ChartState";

export default interface Renderer {
  render(renderingContext: CanvasRenderingContext2D, chartState: ChartState): void;
}