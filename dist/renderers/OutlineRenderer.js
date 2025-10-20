import RenderingUtilities from "./RenderingUtilities";
export default class OutlineRenderer {
    renderingContext;
    chartState;
    renderingUtilities;
    constructor(renderingContext, chartState) {
        this.renderingContext = renderingContext;
        this.chartState = chartState;
        this.renderingUtilities = new RenderingUtilities(renderingContext);
    }
    render() {
        this.renderingUtilities.resetStyle();
        this.drawRectangle(this.chartState.pixelViewport);
    }
    drawRectangle(rect) {
        this.renderingContext.beginPath();
        this.renderingContext.rect(rect.left, rect.top, rect.width, rect.height);
        this.renderingContext.stroke();
    }
}
