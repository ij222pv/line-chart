export default class LineSegment {
    _start;
    _end;
    constructor(start, end) {
        this._start = start;
        this._end = end;
    }
    get start() {
        return this._start;
    }
    get end() {
        return this._end;
    }
    get length() {
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        return Math.hypot(dx, dy);
    }
}
