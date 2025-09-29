import Color from "./Color";
import Point from "./Point";
type PolylineOptions = {
    color?: Color;
    thickness?: number;
};
/**
 * A collection of points connected by straight line segments.
 */
export default class Polyline {
    private _points;
    private _color;
    private _thickness;
    constructor(points?: Point[], options?: PolylineOptions);
    /**
     * The points making up the polyline.
     */
    get points(): Point[];
    /**
     * The color of the polyline.
     */
    get color(): Color;
    /**
     * The thickness of the polyline in pixels.
     */
    get thickness(): number;
}
export {};
