import { Axis } from "../Axis";
import { LABEL_FONT_FAMILY, LABEL_OFFSET, MARGIN, TICK_LENGTH, } from "../constants";
import Point from "../utils/Point";
import AxisTickGenerator from "./AxisTickGenerator";
import RenderingUtilities from "./RenderingUtilities";
export default class AxisRenderer {
    renderingContext;
    chartState;
    renderingUtilities;
    constructor(renderingContext, chartState) {
        this.renderingContext = renderingContext;
        this.chartState = chartState;
        this.renderingUtilities = new RenderingUtilities(renderingContext);
    }
    render() {
        this.drawAxis(new AxisTickGenerator(Axis.X, this.chartState).generate(), Axis.X);
        this.drawAxis(new AxisTickGenerator(Axis.Y, this.chartState).generate(), Axis.Y);
    }
    /**
     * Draw the axis markings and numbers along one axis.
     */
    drawAxis(tickPositionIterator, axis) {
        for (let i = tickPositionIterator.next().value; i !== undefined; i = tickPositionIterator.next().value) {
            this.renderingUtilities.resetStyle();
            this.drawTickAndLabel(i, axis);
        }
    }
    drawTickAndLabel(value, axis) {
        const tickPosition = this.getTickPosition(value, axis);
        this.drawTick(tickPosition, axis);
        const labelPosition = this.getTickLabelPosition(tickPosition, axis);
        const label = this.numberToString(value);
        this.setAxisLabelStyle(label, axis);
        this.drawTickLabel(labelPosition, label);
    }
    setAxisLabelStyle(label, axis) {
        this.setLabelFont(label, MARGIN - LABEL_OFFSET);
        this.renderingContext.fillStyle = "black";
        this.renderingContext.textAlign = axis === Axis.X ? "center" : "right";
        this.renderingContext.textBaseline = axis === Axis.X ? "top" : "middle";
    }
    setLabelFont(text, maxWidth) {
        let fontSize = 13; // The biggest font size to try.
        this.renderingContext.font = `${fontSize}px ${LABEL_FONT_FAMILY}`;
        while (this.renderingContext.measureText(text).width > maxWidth) {
            fontSize -= 0.1;
            this.renderingContext.font = `${fontSize}px ${LABEL_FONT_FAMILY}`;
        }
    }
    getTickPosition(value, axis) {
        let point;
        if (axis === Axis.X) {
            point = new Point(value, this.chartState.viewport.bottom);
        }
        else {
            point = new Point(this.chartState.viewport.left, value);
        }
        const mappedPoint = this.chartState.chartToScreenMapper.mapPoint(point);
        return mappedPoint;
    }
    drawTick(basePoint, axis) {
        let secondPoint;
        if (axis === Axis.X) {
            secondPoint = new Point(basePoint.x, basePoint.y + TICK_LENGTH);
        }
        else {
            secondPoint = new Point(basePoint.x - TICK_LENGTH, basePoint.y);
        }
        this.renderingUtilities.drawLineBetweenPoints(basePoint, secondPoint);
    }
    getTickLabelPosition(tickPosition, axis) {
        let labelPosition;
        if (axis === Axis.X) {
            labelPosition = new Point(tickPosition.x, tickPosition.y + LABEL_OFFSET);
        }
        else {
            labelPosition = new Point(tickPosition.x - LABEL_OFFSET, tickPosition.y);
        }
        return labelPosition;
    }
    numberToString(value) {
        // Round to avoid floating point precision issues. Such as -0.6 being displayed as -0.5999999999999992.
        const rounded = this.roundToDecimalPlaces(value, 10);
        return rounded.toString();
    }
    roundToDecimalPlaces(value, decimalPlaces) {
        return parseFloat(value.toFixed(decimalPlaces));
    }
    drawTickLabel(position, label) {
        this.renderingContext.fillText(label, position.x, position.y);
    }
}
