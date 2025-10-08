import LineSegment from "../utils/LineSegment";
import Point from "../utils/Point";
import Range from "../utils/Range";
const MARGIN = 35;
const TICK_LENGTH = MARGIN * 0.2;
const LABEL_OFFSET = TICK_LENGTH + MARGIN * 0.1;
const LABEL_FONT_FAMILY = "Arial";
var Axis;
(function (Axis) {
    Axis[Axis["X"] = 0] = "X";
    Axis[Axis["Y"] = 1] = "Y";
})(Axis || (Axis = {}));
export default class LineChartRenderer {
    renderingContext;
    chartState;
    constructor(renderingContext, chartState) {
        this.renderingContext = renderingContext;
        this.chartState = chartState;
    }
    render() {
        this.clear();
        this.drawGrid();
        this.drawLines();
        this.drawSideMargins();
        this.drawOutline();
        this.drawAxes();
    }
    /**
     * Clear the entire rendering context.
     */
    clear() {
        this.resetRenderingContext();
        this.fillBackground();
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
    fillBackground() {
        this.renderingContext.fillStyle = "white";
        this.renderingContext.fillRect(0, 0, this.renderingContext.canvas.width, this.renderingContext.canvas.height);
    }
    drawGrid() {
        const axisTickGeneratorX = this.getTickGeneratorFromAxis(Axis.X);
        this.drawGridLines(axisTickGeneratorX, Axis.X);
        const axisTickGeneratorY = this.getTickGeneratorFromAxis(Axis.Y);
        this.drawGridLines(axisTickGeneratorY, Axis.Y);
    }
    getTickGeneratorFromAxis(axis) {
        return this.generateTickPositions(this.getViewportRangeAlongAxis(axis), this.getGoalNumberOfTicksAlongAxis(axis));
    }
    getViewportRangeAlongAxis(axis) {
        if (axis === Axis.X) {
            return this.getViewportRangeAlongX();
        }
        else if (axis === Axis.Y) {
            return this.getViewportRangeAlongY();
        }
        throw new TypeError("invalid axis");
    }
    getViewportRangeAlongX() {
        return new Range(this.chartState.viewport.left, this.chartState.viewport.right);
    }
    getViewportRangeAlongY() {
        return new Range(this.chartState.viewport.bottom, this.chartState.viewport.top);
    }
    getGoalNumberOfTicksAlongAxis(axis) {
        return (this.getPixelViewportSizeAlongAxis(axis) /
            this.chartState.axisTickInterval);
    }
    getPixelViewportSizeAlongAxis(axis) {
        if (axis === Axis.X) {
            return this.chartState.pixelViewport.width;
        }
        else if (axis === Axis.Y) {
            return this.chartState.pixelViewport.height;
        }
        throw new TypeError("invalid axis");
    }
    /**
     * A generator function to yield the positions of axis ticks along an axis.
     */
    *generateTickPositions(range, goalNumberOfTicks) {
        const targetInterval = range.length / goalNumberOfTicks;
        const finalInterval = this.roundToNiceTickInterval(targetInterval);
        for (let i = Math.ceil(range.start / finalInterval) * finalInterval; i <= range.end; i += finalInterval) {
            yield i;
        }
    }
    /**
     * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
     */
    roundToNiceTickInterval(unrounded) {
        const possibleIntervals = this.getPossibleTickIntervals(unrounded);
        return this.getClosestNumberInArray(unrounded, possibleIntervals);
    }
    getPossibleTickIntervals(unrounded) {
        const closestPowerOfTen = this.getClosestPowerOfTen(unrounded);
        return [closestPowerOfTen, closestPowerOfTen * 2, closestPowerOfTen * 5];
    }
    getClosestPowerOfTen(number) {
        return Math.pow(10, Math.floor(Math.log10(number)));
    }
    getClosestNumberInArray(number, array) {
        return array.reduce((previous, current) => {
            if (Math.abs(number - current) < Math.abs(number - previous)) {
                return current;
            }
            else {
                return previous;
            }
        });
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
        this.resetStyle();
        this.renderingContext.strokeStyle = "#e0e0e0";
    }
    drawLineSegment(line) {
        this.drawLineBetweenPoints(line.start, line.end);
    }
    drawLineBetweenPoints(point1, point2) {
        this.renderingContext.beginPath();
        this.renderingContext.moveTo(point1.x, point1.y);
        this.renderingContext.lineTo(point2.x, point2.y);
        this.renderingContext.stroke();
    }
    drawLines() {
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
        this.resetStyle();
        this.renderingContext.strokeStyle = line.color.toString();
        this.renderingContext.lineWidth = line.thickness;
        this.renderingContext.lineCap = "round";
        this.renderingContext.lineJoin = "round";
    }
    drawSideMargins() {
        this.drawLeftMargin();
        this.drawBottomMargin();
    }
    drawLeftMargin() {
        this.resetStyle();
        this.renderingContext.fillStyle = "white";
        this.renderingContext.fillRect(0, 0, MARGIN, this.renderingContext.canvas.height);
    }
    drawBottomMargin() {
        this.resetStyle();
        this.renderingContext.fillStyle = "white";
        this.renderingContext.fillRect(0, this.renderingContext.canvas.height - MARGIN, this.renderingContext.canvas.width, MARGIN);
    }
    drawOutline() {
        this.resetStyle();
        this.drawRectangle(this.chartState.pixelViewport);
    }
    drawRectangle(rect) {
        this.renderingContext.beginPath();
        this.renderingContext.rect(rect.left, rect.top, rect.width, rect.height);
        this.renderingContext.stroke();
    }
    drawAxes() {
        const axisTickGeneratorX = this.getTickGeneratorFromAxis(Axis.X);
        this.drawAxis(axisTickGeneratorX, Axis.X);
        const axisTickGeneratorY = this.getTickGeneratorFromAxis(Axis.Y);
        this.drawAxis(axisTickGeneratorY, Axis.Y);
    }
    /**
     * Draw the axis markings and numbers along one axis.
     */
    drawAxis(tickPositionIterator, axis) {
        for (let i = tickPositionIterator.next().value; i !== undefined; i = tickPositionIterator.next().value) {
            this.resetStyle();
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
        this.drawLineBetweenPoints(basePoint, secondPoint);
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
