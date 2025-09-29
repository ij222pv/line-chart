import Point from "../utils/Point";
import Rectangle from "../utils/Rectangle";
import ChartState from "./ChartState";
export default class LineChartState extends ChartState {
    _lines = [];
    _scaleInterval = 50;
    _paddingX = 0;
    _paddingY = 0;
    _viewport = null;
    constructor() {
        super();
    }
    /**
     * Set the points in the line chart to render.
     */
    addLine(line) {
        this._lines.push(line);
    }
    clearLines() {
        this._lines = [];
    }
    get lines() {
        return this._lines;
    }
    /**
     * Finds and returns the boundary rectangle enclosing all points in the line chart.
     * @returns A rectangle completely enclosing all points in the line chart.
     */
    getBoundary() {
        let topLeft = new Point(Infinity, -Infinity);
        let bottomRight = new Point(-Infinity, Infinity);
        for (const point of this.lines.flatMap((line) => line.points)) {
            topLeft = new Point(Math.min(point.x, topLeft.x), Math.max(point.y, topLeft.y));
            bottomRight = new Point(Math.max(point.x, bottomRight.x), Math.min(point.y, bottomRight.y));
        }
        return new Rectangle(topLeft, bottomRight);
    }
    set viewport(viewport) {
        this._viewport = viewport;
    }
    get viewport() {
        if (this._viewport === null) {
            return this.getBoundary();
        }
        return this._viewport;
    }
    autoFit(options = {}) {
        // TODO: use pixel padding instead of chart coordinate padding
        this.paddingX = options.paddingX ?? 0;
        this.paddingY = options.paddingY ?? 0;
        const boundary = this.getBoundary();
        this.viewport = boundary;
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
}
