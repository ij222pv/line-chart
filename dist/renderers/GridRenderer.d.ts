import type LineChartState from "../states/LineChartState";
import type Renderer from "./Renderer";
export default class GridRenderer implements Renderer {
    private renderingContext;
    private chartState;
    private readonly renderingUtilities;
    constructor(renderingContext: CanvasRenderingContext2D, chartState: LineChartState);
    render(): void;
    private drawGridLines;
    private drawGridLine;
    private getPixelGridLineSegment;
    private getGridLineSegment;
    private getGridLineSegmentOnX;
    private getGridLineSegmentOnY;
    private setGridLineStyle;
    private drawLineSegment;
}
