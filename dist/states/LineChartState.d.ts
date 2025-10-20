import type Polyline from "../model/Polyline";
import Rectangle from "../model/Rectangle";
import RectangleMapper from "../model/RectangleMapper";
import ChartState from "./ChartState";
export default class LineChartState extends ChartState {
    private _lines;
    private _scaleInterval;
    private _paddingX;
    private _paddingY;
    private _viewport;
    private _boundingBoxOfLines;
    constructor();
    /**
     * Set the points in the line chart to render.
     */
    addLine(line: Polyline): void;
    clearLines(): void;
    private calculateBoundingBoxOfLines;
    get lines(): Polyline[];
    get boundingBoxOfLines(): Rectangle;
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
    get pixelViewportMinusPadding(): Rectangle;
    get pixelViewport(): Rectangle;
    get chartToScreenMapper(): RectangleMapper;
}
