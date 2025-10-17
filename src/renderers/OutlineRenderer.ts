import type LineChartState from "../states/LineChartState";
import type Rectangle from "../utils/Rectangle";
import type Renderer from "./Renderer";
import RenderingUtilities from "./RenderingUtilities";

export default class OutlineRenderer implements Renderer {
  private readonly renderingUtilities: RenderingUtilities;

  public constructor(
    private renderingContext: CanvasRenderingContext2D,
    private chartState: LineChartState,
  ) {
    this.renderingUtilities = new RenderingUtilities(renderingContext);
  }

  public render(): void {
    this.renderingUtilities.resetStyle();
    this.drawRectangle(this.chartState.pixelViewport);
  }

  private drawRectangle(rect: Rectangle): void {
    this.renderingContext.beginPath();
    this.renderingContext.rect(rect.left, rect.top, rect.width, rect.height);
    this.renderingContext.stroke();
  }
}
