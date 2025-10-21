import type Color from "../model/Color";
import type Point from "../model/Point";
export default class RenderingUtilities {
    private renderingContext;
    constructor(renderingContext: CanvasRenderingContext2D);
    resetRenderingContext(): void;
    resetStyle(): void;
    fillBackground(color: Color): void;
    drawLineBetweenPoints(point1: Point, point2: Point): void;
}
