import type Polyline from "../utils/Polyline";
import Rectangle from "../utils/Rectangle";
import ChartState from "./ChartState";
export default class LineChartState extends ChartState {
    private _lines;
    private _scaleInterval;
    private _paddingX;
    private _paddingY;
    private _viewport;
    constructor();
    /**
     * Set the points in the line chart to render.
     */
    addLine(line: Polyline): void;
    clearLines(): void;
    get lines(): Polyline[];
    /**
     * Finds and returns the boundary rectangle enclosing all points in the line chart.
     * @returns A rectangle completely enclosing all points in the line chart.
     */
    getBoundary(): Rectangle;
    set viewport(viewport: Rectangle);
    get viewport(): Rectangle;
    autoFit(options?: {
        paddingX?: number;
        paddingY?: number;
    }): void;
    set axisTickInterval(value: number);
    get axisTickInterval(): number;
    set paddingX(value: number);
    get paddingX(): number;
    set paddingY(value: number);
    get paddingY(): number;
}
