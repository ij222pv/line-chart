import type Renderer from "./Renderer";
export default class SideMarginRenderer implements Renderer {
    private renderingContext;
    private readonly renderingUtilities;
    constructor(renderingContext: CanvasRenderingContext2D);
    render(): void;
    private drawLeftMargin;
    private drawBottomMargin;
}
