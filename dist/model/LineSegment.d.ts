import type Point from "./Point";
export default class LineSegment {
    private readonly _start;
    private readonly _end;
    constructor(start: Point, end: Point);
    get start(): Point;
    get end(): Point;
    get length(): number;
}
