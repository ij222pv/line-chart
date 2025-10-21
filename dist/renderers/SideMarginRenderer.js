import { MARGIN } from "../constants";
import RenderingUtilities from "./RenderingUtilities";
export default class SideMarginRenderer {
    renderingContext;
    renderingUtilities;
    constructor(renderingContext) {
        this.renderingContext = renderingContext;
        this.renderingUtilities = new RenderingUtilities(renderingContext);
    }
    render() {
        this.drawLeftMargin();
        this.drawBottomMargin();
    }
    drawLeftMargin() {
        this.renderingUtilities.resetStyle();
        this.renderingContext.fillStyle = "white";
        this.renderingContext.fillRect(0, 0, MARGIN, this.renderingContext.canvas.height);
    }
    drawBottomMargin() {
        this.renderingUtilities.resetStyle();
        this.renderingContext.fillStyle = "white";
        this.renderingContext.fillRect(0, this.renderingContext.canvas.height - MARGIN, this.renderingContext.canvas.width, MARGIN);
    }
}
