import Point from "../model/Point";
import Rectangle from "../model/Rectangle";
import RectangleMapper from "../model/RectangleMapper";
import ChartState from "./ChartState";
const MARGIN = 35;
export default class LineChartState extends ChartState {
    _lines = [];
    _scaleInterval = 50;
    _paddingX = 0;
    _paddingY = 0;
    _viewport = null;
    _boundingBoxOfLines = this.calculateBoundingBoxOfLines();
    constructor() {
        super();
    }
    /**
     * Set the points in the line chart to render.
     */
    addLine(line) {
        this._lines.push(line);
        this._boundingBoxOfLines = this.calculateBoundingBoxOfLines();
    }
    clearLines() {
        this._lines = [];
        this._boundingBoxOfLines = this.calculateBoundingBoxOfLines();
    }
    calculateBoundingBoxOfLines() {
        let topLeft = new Point(Infinity, -Infinity);
        let bottomRight = new Point(-Infinity, Infinity);
        for (const point of this.lines.flatMap((line) => line.points)) {
            topLeft = new Point(Math.min(point.x, topLeft.x), Math.max(point.y, topLeft.y));
            bottomRight = new Point(Math.max(point.x, bottomRight.x), Math.min(point.y, bottomRight.y));
        }
        return new Rectangle(topLeft, bottomRight);
    }
    get lines() {
        return this._lines;
    }
    get boundingBoxOfLines() {
        return this._boundingBoxOfLines;
    }
    set viewport(viewport) {
        this._viewport = viewport;
    }
    get viewport() {
        if (this._viewport === null) {
            this.autoFit();
        }
        return this._viewport;
    }
    autoFit(options = {}) {
        this.paddingX = options.paddingX ?? 0;
        this.paddingY = options.paddingY ?? 0;
        const autoFitMapper = new RectangleMapper(this.boundingBoxOfLines, this.pixelViewportMinusPadding);
        this.viewport = autoFitMapper.reverseMapRectangle(this.pixelViewport);
    }
    set axisTickInterval(value) {
        if (typeof value !== "number" || value <= 0 || !Number.isFinite(value)) {
            throw new TypeError("scale interval must be a positive number");
        }
        this._scaleInterval = value;
    }
    get axisTickInterval() {
        return this._scaleInterval;
    }
    set paddingX(value) {
        if (typeof value !== "number" || value < 0 || !Number.isFinite(value)) {
            throw new TypeError("padding must be a non-negative number");
        }
        this._paddingX = value;
    }
    get paddingX() {
        return this._paddingX;
    }
    set paddingY(value) {
        if (typeof value !== "number" || value < 0 || !Number.isFinite(value)) {
            throw new TypeError("padding must be a non-negative number");
        }
        this._paddingY = value;
    }
    get paddingY() {
        return this._paddingY;
    }
    get pixelViewportMinusPadding() {
        const left = MARGIN + this.paddingX;
        const top = this.paddingY;
        const right = this.canvasWidth - this.paddingX;
        const bottom = this.canvasHeight - MARGIN - this.paddingY;
        return new Rectangle(new Point(left, top), new Point(right, bottom));
    }
    get pixelViewport() {
        const left = MARGIN;
        const top = 0;
        const right = this.canvasWidth;
        const bottom = this.canvasHeight - MARGIN;
        return new Rectangle(new Point(left, top), new Point(right, bottom));
    }
    get chartToScreenMapper() {
        return new RectangleMapper(this.viewport, this.pixelViewport);
    }
}
