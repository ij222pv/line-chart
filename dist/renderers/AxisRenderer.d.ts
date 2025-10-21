import type LineChartState from "../states/LineChartState";
import type Renderer from "./Renderer";
export default class AxisRenderer implements Renderer {
    private renderingContext;
    private chartState;
    private readonly renderingUtilities;
    constructor(renderingContext: CanvasRenderingContext2D, chartState: LineChartState);
    render(): void;
    /**
     * Draw the axis markings and numbers along one axis.
     */
    private drawAxis;
    private drawTickAndLabel;
    private setAxisLabelStyle;
    private setLabelFont;
    private getTickPosition;
    private drawTick;
    private getTickLabelPosition;
    private numberToString;
    private roundToDecimalPlaces;
    private drawTickLabel;
}
