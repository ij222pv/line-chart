import { MARGIN } from "../constants";
import type Renderer from "./Renderer";
import RenderingUtilities from "./RenderingUtilities";

export default class SideMarginRenderer implements Renderer {
  private readonly renderingUtilities: RenderingUtilities;

  public constructor(private renderingContext: CanvasRenderingContext2D) {
    this.renderingUtilities = new RenderingUtilities(renderingContext);
  }

  public render(): void {
    this.drawLeftMargin();
    this.drawBottomMargin();
  }

  private drawLeftMargin(): void {
    this.renderingUtilities.resetStyle();
    this.renderingContext.fillStyle = "white";
    this.renderingContext.fillRect(
      0,
      0,
      MARGIN,
      this.renderingContext.canvas.height,
    );
  }

  private drawBottomMargin(): void {
    this.renderingUtilities.resetStyle();
    this.renderingContext.fillStyle = "white";
    this.renderingContext.fillRect(
      0,
      this.renderingContext.canvas.height - MARGIN,
      this.renderingContext.canvas.width,
      MARGIN,
    );
  }
}
