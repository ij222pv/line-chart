import RenderingUtilities from "./RenderingUtilities";
export default class LineRenderer {
    renderingContext;
    chartState;
    renderingUtilities;
    constructor(renderingContext, chartState) {
        this.renderingContext = renderingContext;
        this.chartState = chartState;
        this.renderingUtilities = new RenderingUtilities(renderingContext);
    }
    render() {
        for (const line of this.chartState.lines) {
            this.drawLine(line);
        }
    }
    /**
     * Draw a line in the chart.
     */
    drawLine(line) {
        this.setChartLineStyle(line);
        this.renderingContext.beginPath();
        for (const point of line.points) {
            const mappedPoint = this.chartState.chartToScreenMapper.mapPoint(point);
            this.renderingContext.lineTo(mappedPoint.x, mappedPoint.y);
        }
        this.renderingContext.stroke();
    }
    setChartLineStyle(line) {
        this.renderingUtilities.resetStyle();
        this.renderingContext.strokeStyle = line.color.toString();
        this.renderingContext.lineWidth = line.thickness;
        this.renderingContext.lineCap = "round";
        this.renderingContext.lineJoin = "round";
    }
}
