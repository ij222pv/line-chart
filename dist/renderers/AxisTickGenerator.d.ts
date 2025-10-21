import { Axis } from "../Axis";
import type LineChartState from "../states/LineChartState";
export default class AxisTickGenerator {
    private readonly axis;
    private readonly chartState;
    constructor(axis: Axis, chartState: LineChartState);
    generate(): Iterator<number>;
    private getViewportRange;
    private getViewportRangeAlongX;
    private getViewportRangeAlongY;
    private getGoalNumberOfTicks;
    private getPixelViewportSize;
}
