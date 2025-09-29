import LineSegment from "../utils/LineSegment";
import Point from "../utils/Point";
import Range from "../utils/Range";
import Rectangle from "../utils/Rectangle";
import RectangleMapper from "../utils/RectangleMapper";
const MARGIN = 35;
const TICK_LENGTH = MARGIN * 0.2;
const LABEL_OFFSET = TICK_LENGTH + MARGIN * 0.1;
var Axis;
(function (Axis) {
    Axis[Axis["X"] = 0] = "X";
    Axis[Axis["Y"] = 1] = "Y";
})(Axis || (Axis = {}));
export default class LineChartRenderer {
    renderingContext;
    chartState;
    chartToScreenMapper = null;
    chartArea = null;
    pixelChartArea = null;
    constructor(renderingContext, chartState) {
        this.renderingContext = renderingContext;
        this.chartState = chartState;
    }
    render() {
        // TODO: factor this out elsewhere. Perhaps the state should keep track of this?
        const pixelLineArea = this.getLineAreaInPixels();
        this.pixelChartArea = this.getChartAreaInPixels();
        this.chartToScreenMapper = new RectangleMapper(this.chartState.viewport, pixelLineArea);
        this.chartArea = this.chartToScreenMapper.reverseMapRectangle(this.pixelChartArea);
        this.clear();
        this.drawGrid();
        this.drawOutline();
        for (const line of this.chartState.lines) {
            this.drawLine(line);
        }
        this.drawAxes();
    }
    /**
     * Gets the area inside the chart encompassing where lines will be drawn.
     * @returns The chart boundary rectangle in pixel coordinates.
     */
    getLineAreaInPixels() {
        const left = MARGIN + this.chartState.paddingX;
        const top = this.chartState.paddingY;
        const right = this.chartState.canvasWidth - this.chartState.paddingX;
        const bottom = this.chartState.canvasHeight - MARGIN - this.chartState.paddingY;
        return new Rectangle(new Point(left, top), new Point(right, bottom));
    }
    /**
     * Gets the area of the chart where lines will be drawn.
     * @returns The chart area rectangle in pixel coordinates.
     */
    getChartAreaInPixels() {
        const left = MARGIN;
        const top = 0;
        const right = this.chartState.canvasWidth;
        const bottom = this.chartState.canvasHeight - MARGIN;
        return new Rectangle(new Point(left, top), new Point(right, bottom));
    }
    /**
     * Clear the entire rendering context.
     */
    clear() {
        this.renderingContext.fillStyle = "white";
        this.renderingContext.fillRect(0, 0, this.renderingContext.canvas.width, this.renderingContext.canvas.height);
    }
    /**
     * Draw the outline of the chart area. And an outline around the entire canvas.
     */
    drawOutline() {
        this.renderingContext.beginPath();
        this.renderingContext.rect(0, 0, this.chartState.canvasWidth, this.chartState.canvasHeight);
        this.renderingContext.rect(MARGIN, 0, this.chartState.canvasWidth - MARGIN, this.chartState.canvasHeight - MARGIN);
        this.renderingContext.stroke();
    }
    /**
     * Draw the line connecting all points in the chart.
     */
    drawLine(line) {
        this.renderingContext.beginPath();
        for (const point of line.points) {
            const mappedPoint = this.chartToScreenMapper.mapPoint(point);
            this.renderingContext.lineTo(mappedPoint.x, mappedPoint.y);
        }
        this.renderingContext.save();
        this.renderingContext.strokeStyle = line.color.toString();
        this.renderingContext.lineWidth = line.thickness;
        this.renderingContext.lineCap = "round";
        this.renderingContext.lineJoin = "round";
        this.renderingContext.stroke();
        this.renderingContext.restore();
    }
    /**
     * Draw the axes along the X and Y axis.
     */
    drawAxes() {
        // X-axis
        const axisTickGeneratorX = this.generateTickPositions(new Range(this.chartArea.left, this.chartArea.right), this.pixelChartArea.width / this.chartState.axisTickInterval);
        this.drawAxis(axisTickGeneratorX, Axis.X);
        // Y-axis
        const axisTickGeneratorY = this.generateTickPositions(new Range(this.chartArea.bottom, this.chartArea.top), this.pixelChartArea.height / this.chartState.axisTickInterval);
        this.drawAxis(axisTickGeneratorY, Axis.Y);
    }
    /**
     * Draw the axis markings and numbers along one axis.
     */
    drawAxis(tickPositionIterator, axis) {
        this.setAxisLabelStyle(axis);
        for (let i = tickPositionIterator.next().value; i !== undefined; i = tickPositionIterator.next().value) {
            this.drawTickAndLabel(i, axis);
        }
    }
    setAxisLabelStyle(axis) {
        this.renderingContext.fillStyle = "black";
        this.renderingContext.font = "12px Arial";
        this.renderingContext.textAlign = axis === Axis.X ? "center" : "right";
        this.renderingContext.textBaseline = axis === Axis.X ? "top" : "middle";
    }
    drawTickAndLabel(value, axis) {
        const tickPosition = this.getTickPosition(value, axis);
        this.drawTick(tickPosition, axis);
        const labelPosition = this.getTickLabelPosition(tickPosition, axis);
        this.drawTickLabel(labelPosition, this.numberToString(value));
    }
    getTickPosition(value, axis) {
        let point;
        if (axis === Axis.X) {
            point = new Point(value, this.chartArea.bottom);
        }
        else {
            point = new Point(this.chartArea.left, value);
        }
        const mappedPoint = this.chartToScreenMapper.mapPoint(point);
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
    drawLineBetweenPoints(point1, point2) {
        this.renderingContext.beginPath();
        this.renderingContext.moveTo(point1.x, point1.y);
        this.renderingContext.lineTo(point2.x, point2.y);
        this.renderingContext.stroke();
    }
    drawLineSegment(line) {
        this.drawLineBetweenPoints(line.start, line.end);
    }
    /**
     * A generator function to yield the positions of axis ticks along an axis.
     */
    *generateTickPositions(range, goalNumberOfTicks) {
        const targetInterval = range.length / goalNumberOfTicks;
        const finalInterval = this.roundTickInterval(targetInterval);
        for (let i = Math.ceil(range.start / finalInterval) * finalInterval; i <= range.end; i += finalInterval) {
            yield i;
        }
    }
    /**
     * Rounds a number to the nearest number matching the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20 etc.
     */
    roundTickInterval(value) {
        const closestPowerOfTen = Math.pow(10, Math.floor(Math.log10(value)));
        const intervals = [
            closestPowerOfTen,
            closestPowerOfTen * 2,
            closestPowerOfTen * 5,
        ];
        const finalInterval = intervals.reduce((previous, current) => {
            if (Math.abs(value - current) < Math.abs(value - previous)) {
                return current;
            }
            else {
                return previous;
            }
        });
        return finalInterval;
    }
    drawGrid() {
        const axisTickGeneratorX = this.generateTickPositions(new Range(this.chartArea.left, this.chartArea.right), this.pixelChartArea.width / this.chartState.axisTickInterval);
        this.drawGridLines(axisTickGeneratorX, Axis.X);
        const axisTickGeneratorY = this.generateTickPositions(new Range(this.chartArea.bottom, this.chartArea.top), this.pixelChartArea.height / this.chartState.axisTickInterval);
        this.drawGridLines(axisTickGeneratorY, Axis.Y);
    }
    drawGridLines(tickPositionIterator, axis) {
        for (let i = tickPositionIterator.next().value; i !== undefined; i = tickPositionIterator.next().value) {
            this.drawGridLine(i, axis);
        }
    }
    drawGridLine(value, axis) {
        this.renderingContext.save();
        this.renderingContext.strokeStyle = "#e0e0e0";
        let line;
        if (axis === Axis.X) {
            line = new LineSegment(new Point(value, this.chartArea.bottom), new Point(value, this.chartArea.top));
        }
        else {
            line = new LineSegment(new Point(this.chartArea.left, value), new Point(this.chartArea.right, value));
        }
        const mappedLine = this.chartToScreenMapper.mapLineSegment(line);
        this.drawLineSegment(mappedLine);
        this.renderingContext.restore();
    }
}
