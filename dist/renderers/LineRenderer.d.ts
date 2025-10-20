import type LineChartState from "../states/LineChartState";
import type Renderer from "./Renderer";
export default class LineRenderer implements Renderer {
    private renderingContext;
    private chartState;
    private readonly renderingUtilities;
    constructor(renderingContext: CanvasRenderingContext2D, chartState: LineChartState);
    render(): void;
    /**
     * Draw a line in the chart.
     */
    private drawLine;
    private setChartLineStyle;
}
