import type Color from "../utils/Color";
import type Point from "../utils/Point";

export default class RenderingUtilities {
  public constructor(private renderingContext: CanvasRenderingContext2D) {}

  public resetRenderingContext(): void {
    this.renderingContext.reset();
    // Save the clean rendering context state so it can easily be restored later using this.resetStyle().
    this.renderingContext.save();
  }

  public resetStyle(): void {
    this.renderingContext.restore();
    this.renderingContext.save();
  }

  public fillBackground(color: Color): void {
    this.renderingContext.fillStyle = color.toString();
    this.renderingContext.fillRect(
      0,
      0,
      this.renderingContext.canvas.width,
      this.renderingContext.canvas.height,
    );
  }

  public drawLineBetweenPoints(point1: Point, point2: Point): void {
    this.renderingContext.beginPath();
    this.renderingContext.moveTo(point1.x, point1.y);
    this.renderingContext.lineTo(point2.x, point2.y);
    this.renderingContext.stroke();
  }
}
