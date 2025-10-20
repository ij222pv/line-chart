export default class RenderingUtilities {
    renderingContext;
    constructor(renderingContext) {
        this.renderingContext = renderingContext;
    }
    resetRenderingContext() {
        this.renderingContext.reset();
        // Save the clean rendering context state so it can easily be restored later using this.resetStyle().
        this.renderingContext.save();
    }
    resetStyle() {
        this.renderingContext.restore();
        this.renderingContext.save();
    }
    fillBackground(color) {
        this.renderingContext.fillStyle = color.toString();
        this.renderingContext.fillRect(0, 0, this.renderingContext.canvas.width, this.renderingContext.canvas.height);
    }
    drawLineBetweenPoints(point1, point2) {
        this.renderingContext.beginPath();
        this.renderingContext.moveTo(point1.x, point1.y);
        this.renderingContext.lineTo(point2.x, point2.y);
        this.renderingContext.stroke();
    }
}
