import type LineChartState from "../states/LineChartState";
import type Renderer from "./Renderer";
export default class LineChartRenderer implements Renderer {
    private renderingContext;
    private chartState;
    private chartToScreenMapper;
    private chartArea;
    private pixelChartArea;
    constructor(renderingContext: CanvasRenderingContext2D, chartState: LineChartState);
    render(): void;
    /**
     * Gets the area inside the chart encompassing where lines will be drawn.
     * @returns The chart boundary rectangle in pixel coordinates.
     */
    private getLineAreaInPixels;
    /**
     * Gets the area of the chart where lines will be drawn.
     * @returns The chart area rectangle in pixel coordinates.
     */
    private getChartAreaInPixels;
    /**
     * Clear the entire rendering context.
     */
    private clear;
    /**
     * Draw the outline of the chart area. And an outline around the entire canvas.
     */
    private drawOutline;
    /**
     * Draw the line connecting all points in the chart.
     */
    private drawLine;
    /**
     * Draw the axes along the X and Y axis.
     */
    private drawAxes;
    /**
     * Draw the axis markings and numbers along one axis.
     */
    private drawAxis;
    private setAxisLabelStyle;
    private drawTickAndLabel;
    private getTickPosition;
    private drawTick;
    private getTickLabelPosition;
    private numberToString;
    private roundToDecimalPlaces;
    private drawTickLabel;
    private drawLineBetweenPoints;
    private drawLineSegment;
    /**
     * A generator function to yield the positions of axis ticks along an axis.
     */
    private generateTickPositions;
    /**
     * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
     */
    private roundTickInterval;
    private drawGrid;
    private drawGridLines;
    private drawGridLine;
}
