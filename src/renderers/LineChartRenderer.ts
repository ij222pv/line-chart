import type LineChartState from "../states/LineChartState";
import Color from "../utils/Color";
import AxisRenderer from "./AxisRenderer";
import GridRenderer from "./GridRenderer";
import LineRenderer from "./LineRenderer";
import OutlineRenderer from "./OutlineRenderer";
import type Renderer from "./Renderer";
import RenderingUtilities from "./RenderingUtilities";
import SideMarginRenderer from "./SideMarginRenderer";

export default class LineChartRenderer implements Renderer {
  private readonly renderingUtilities: RenderingUtilities;

  public constructor(
    private renderingContext: CanvasRenderingContext2D,
    private chartState: LineChartState,
  ) {
    this.renderingUtilities = new RenderingUtilities(renderingContext);
  }

  public render(): void {
    this.clear();
    new GridRenderer(this.renderingContext, this.chartState).render();
    new LineRenderer(this.renderingContext, this.chartState).render();
    new SideMarginRenderer(this.renderingContext).render();
    new OutlineRenderer(this.renderingContext, this.chartState).render();
    new AxisRenderer(this.renderingContext, this.chartState).render();
  }

  /**
   * Clear the entire rendering context.
   */
  private clear(): void {
    this.renderingUtilities.resetRenderingContext();
    this.renderingUtilities.fillBackground(new Color("white"));
  }
}
