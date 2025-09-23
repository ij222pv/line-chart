import type Point from "./Point";

export default class LineSegment {
  private readonly _start: Point;
  private readonly _end: Point;

  constructor(start: Point, end: Point) {
    this._start = start;
    this._end = end;
  }

  get start(): Point {
    return this._start;
  }

  get end(): Point {
    return this._end;
  }

  get length(): number {
    const dx = this.end.x - this.start.x;
    const dy = this.end.y - this.start.y;
    return Math.hypot(dx, dy);
  }
}