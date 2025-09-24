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
  private _points: Point[];
  private _color: Color;
  private _thickness: number;

  constructor(points: Point[] = [], options?: PolylineOptions) {
    for (const point of points) {
      if (!(point instanceof Point)) {
        throw new TypeError("input array contains non-Point element");
      }
    }

    this._points = Array.from(points);
    this._color = options?.color ?? new Color();
    this._thickness = options?.thickness ?? 1;
  }

  get points(): Point[] {
    return this._points;
  }

  get color(): Color {
    return this._color;
  }

  get thickness(): number {
    return this._thickness;
  }
}
