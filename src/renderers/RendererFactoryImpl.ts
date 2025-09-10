import LineChartRenderer from "./LineChartRenderer";
import type ChartState from "../states/ChartState";
import type Renderer from "./Renderer";
import type RendererFactory from "./RendererFactory";
import LineChartState from "../states/LineChartState";

export default class RendererFactoryImpl implements RendererFactory {
  makeRenderer(chart: ChartState): Renderer {
    if (chart instanceof LineChartState) {
      return new LineChartRenderer();
    }

    throw new TypeError("chart type missing corresponding renderer");
  }
}