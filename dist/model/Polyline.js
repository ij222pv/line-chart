import Color from "./Color";
import Point from "./Point";
/**
 * A collection of points connected by straight line segments.
 */
export default class Polyline {
    _points;
    _color;
    _thickness;
    /**
     * Creates a Polyline from an array of points.
     * @param points The points making up the Polyline.
     * @param options The options object defining how the Polyline is styled.
     */
    constructor(points = [], options) {
        for (const point of points) {
            if (!(point instanceof Point)) {
                throw new TypeError("input array contains non-Point element");
            }
        }
        this._points = Array.from(points);
        this._color = options?.color ?? new Color();
        this._thickness = options?.thickness ?? 1;
    }
    /**
     * The points making up the polyline.
     */
    get points() {
        return this._points;
    }
    /**
     * The color of the polyline.
     */
    get color() {
        return this._color;
    }
    /**
     * The thickness of the polyline in pixels.
     */
    get thickness() {
        return this._thickness;
    }
}
