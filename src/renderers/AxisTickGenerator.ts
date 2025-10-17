import { Axis } from "../Axis";
import type LineChartState from "../states/LineChartState";
import Range from "../utils/Range";
import TickGenerator from "./TickGenerator";

export default class AxisTickGenerator {
  constructor(
    private readonly axis: Axis,
    private readonly chartState: LineChartState,
  ) {}

  public generate(): Iterator<number> {
    const tickGenerator = new TickGenerator();
    return tickGenerator.generate(
      this.getViewportRange(),
      this.getGoalNumberOfTicks(),
    );
  }

  private getViewportRange(): Range {
    if (this.axis === Axis.X) {
      return this.getViewportRangeAlongX();
    } else if (this.axis === Axis.Y) {
      return this.getViewportRangeAlongY();
    }
    throw new TypeError("invalid axis");
  }

  private getViewportRangeAlongX(): Range {
    return new Range(
      this.chartState.viewport!.left,
      this.chartState.viewport!.right,
    );
  }

  private getViewportRangeAlongY(): Range {
    return new Range(
      this.chartState.viewport!.bottom,
      this.chartState.viewport!.top,
    );
  }

  private getGoalNumberOfTicks(): number {
    return this.getPixelViewportSize() / this.chartState.axisTickInterval;
  }

  private getPixelViewportSize(): number {
    if (this.axis === Axis.X) {
      return this.chartState.pixelViewport!.width;
    } else if (this.axis === Axis.Y) {
      return this.chartState.pixelViewport!.height;
    }
    throw new TypeError("invalid axis");
  }
}
