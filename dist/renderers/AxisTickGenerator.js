import { Axis } from "../Axis";
import Range from "../model/Range";
import TickGenerator from "./TickGenerator";
export default class AxisTickGenerator {
    axis;
    chartState;
    constructor(axis, chartState) {
        this.axis = axis;
        this.chartState = chartState;
    }
    generate() {
        const tickGenerator = new TickGenerator();
        return tickGenerator.generate(this.getViewportRange(), this.getGoalNumberOfTicks());
    }
    getViewportRange() {
        if (this.axis === Axis.X) {
            return this.getViewportRangeAlongX();
        }
        else if (this.axis === Axis.Y) {
            return this.getViewportRangeAlongY();
        }
        throw new TypeError("invalid axis");
    }
    getViewportRangeAlongX() {
        return new Range(this.chartState.viewport.left, this.chartState.viewport.right);
    }
    getViewportRangeAlongY() {
        return new Range(this.chartState.viewport.bottom, this.chartState.viewport.top);
    }
    getGoalNumberOfTicks() {
        return this.getPixelViewportSize() / this.chartState.axisTickInterval;
    }
    getPixelViewportSize() {
        if (this.axis === Axis.X) {
            return this.chartState.pixelViewport.width;
        }
        else if (this.axis === Axis.Y) {
            return this.chartState.pixelViewport.height;
        }
        throw new TypeError("invalid axis");
    }
}
