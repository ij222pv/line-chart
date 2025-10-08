import type LineChartState from "../states/LineChartState";
import type Renderer from "./Renderer";
export default class LineChartRenderer implements Renderer {
    private renderingContext;
    private chartState;
    constructor(renderingContext: CanvasRenderingContext2D, chartState: LineChartState);
    render(): void;
    /**
     * Clear the entire rendering context.
     */
    private clear;
    private resetRenderingContext;
    private resetStyle;
    private fillBackground;
    private drawGrid;
    private getTickGeneratorFromAxis;
    private getViewportRangeAlongAxis;
    private getViewportRangeAlongX;
    private getViewportRangeAlongY;
    private getGoalNumberOfTicksAlongAxis;
    private getPixelViewportSizeAlongAxis;
    /**
     * A generator function to yield the positions of axis ticks along an axis.
     */
    private generateTickPositions;
    /**
     * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
     */
    private roundToNiceTickInterval;
    private getPossibleTickIntervals;
    private getClosestPowerOfTen;
    private getClosestNumberInArray;
    private drawGridLines;
    private drawGridLine;
    private getPixelGridLineSegment;
    private getGridLineSegment;
    private getGridLineSegmentOnX;
    private getGridLineSegmentOnY;
    private setGridLineStyle;
    private drawLineSegment;
    private drawLineBetweenPoints;
    private drawLines;
    /**
     * Draw a line in the chart.
     */
    private drawLine;
    private setChartLineStyle;
    private drawSideMargins;
    private drawLeftMargin;
    private drawBottomMargin;
    private drawOutline;
    private drawRectangle;
    private drawAxes;
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
