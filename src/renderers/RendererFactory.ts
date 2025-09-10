import type ChartState from "../states/ChartState";
import type Renderer from "./Renderer";

export default interface RendererFactory {
  makeRenderer(chart: ChartState): Renderer;
}