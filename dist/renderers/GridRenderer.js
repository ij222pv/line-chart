import { Axis } from "../Axis";
import LineSegment from "../model/LineSegment";
import Point from "../model/Point";
import AxisTickGenerator from "./AxisTickGenerator";
import RenderingUtilities from "./RenderingUtilities";
export default class GridRenderer {
    renderingContext;
    chartState;
    renderingUtilities;
    constructor(renderingContext, chartState) {
        this.renderingContext = renderingContext;
        this.chartState = chartState;
        this.renderingUtilities = new RenderingUtilities(renderingContext);
    }
    render() {
        this.drawGridLines(new AxisTickGenerator(Axis.X, this.chartState).generate(), Axis.X);
        this.drawGridLines(new AxisTickGenerator(Axis.Y, this.chartState).generate(), Axis.Y);
    }
    drawGridLines(tickPositionIterator, axis) {
        for (let i = tickPositionIterator.next().value; i !== undefined; i = tickPositionIterator.next().value) {
            this.drawGridLine(i, axis);
        }
    }
    drawGridLine(value, axis) {
        const pixelLine = this.getPixelGridLineSegment(value, axis);
        this.setGridLineStyle();
        this.drawLineSegment(pixelLine);
    }
    getPixelGridLineSegment(value, axis) {
        const line = this.getGridLineSegment(value, axis);
        return this.chartState.chartToScreenMapper.mapLineSegment(line);
    }
    getGridLineSegment(value, axis) {
        if (axis === Axis.X) {
            return this.getGridLineSegmentOnX(value);
        }
        else if (axis === Axis.Y) {
            return this.getGridLineSegmentOnY(value);
        }
        throw new TypeError("invalid axis");
    }
    getGridLineSegmentOnX(value) {
        return new LineSegment(new Point(value, this.chartState.viewport.bottom), new Point(value, this.chartState.viewport.top));
    }
    getGridLineSegmentOnY(value) {
        return new LineSegment(new Point(this.chartState.viewport.left, value), new Point(this.chartState.viewport.right, value));
    }
    setGridLineStyle() {
        this.renderingUtilities.resetStyle();
        this.renderingContext.strokeStyle = "#e0e0e0";
    }
    drawLineSegment(line) {
        this.renderingUtilities.drawLineBetweenPoints(line.start, line.end);
    }
}
