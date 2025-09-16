import type ChartState from "../states/ChartState";

export default interface Renderer {
  /**
   * Render the given chart state to the given rendering context.
   */
  render(renderingContext: CanvasRenderingContext2D, chartState: ChartState): void;
}