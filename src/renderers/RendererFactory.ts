import type ChartState from "../states/ChartState";
import type Renderer from "./Renderer";

/**
 * A factory interface for creating renderers for different chart states.
 */
export default interface RendererFactory {
  /**
   * Create a renderer suitable for rendering the given chart state.
   * @throws TypeError if no suitable renderer exists for the given chart state.
   */
  makeRenderer(chart: ChartState): Renderer;
}
