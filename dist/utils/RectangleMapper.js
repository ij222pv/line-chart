import LineSegment from "./LineSegment";
import Point from "./Point";
import Rectangle from "./Rectangle";
/**
 * Maps points from the reference frame of one rectangle to another.
 */
export default class RectangleMapper {
    source;
    target;
    constructor(from, to) {
        this.source = from;
        this.target = to;
    }
    /**
     * Maps a point from the reference frame of one rectangle to another. The point
     * will keep its relative position in the new rectangle.
     * For example, a point in the center of the source
     * rectangle will be mapped to the center of the target
     * rectangle.
     */
    mapPoint(point) {
        const relativeToSource = new Point(point.x - this.source.left, point.y - this.source.top);
        const scaledToTarget = new Point((relativeToSource.x / this.source.width) * this.target.width, (relativeToSource.y / this.source.height) * this.target.height);
        const mappedToTarget = new Point(scaledToTarget.x + this.target.left, scaledToTarget.y + this.target.top);
        return mappedToTarget;
    }
    /**
     * Maps a point relative to the target rectangle back to the source rectangle.
     */
    reverseMapPoint(point) {
        const relativeToSource = new Point(point.x - this.target.left, point.y - this.target.top);
        const scaledToTarget = new Point((relativeToSource.x / this.target.width) * this.source.width, (relativeToSource.y / this.target.height) * this.source.height);
        const mappedToTarget = new Point(scaledToTarget.x + this.source.left, scaledToTarget.y + this.source.top);
        return mappedToTarget;
    }
    /**
     * Maps a rectangle from one reference frame to another. The rectangle
     * will keep its relative position in the new rectangle.
     * For example, a rectangle half the size of the source
     * rectangle will be mapped to a rectangle half the size of the target
     * rectangle.
     */
    mapRectangle(rectangle) {
        const topLeft = this.mapPoint(rectangle.topLeft);
        const bottomRight = this.mapPoint(rectangle.bottomRight);
        return new Rectangle(topLeft, bottomRight);
    }
    /**
     * Maps a rectangle from the reference frame of the target rectangle back to the source rectangle.
     */
    reverseMapRectangle(rectangle) {
        const topLeft = this.reverseMapPoint(rectangle.topLeft);
        const bottomRight = this.reverseMapPoint(rectangle.bottomRight);
        return new Rectangle(topLeft, bottomRight);
    }
    /**
     * Maps a line segment from one reference frame to another. The line segment
     * will keep its relative position in the new rectangle.
     */
    mapLineSegment(line) {
        return new LineSegment(this.mapPoint(line.start), this.mapPoint(line.end));
    }
    /**
     * Maps a line segment from the reference frame of the target rectangle back to the source rectangle.
     */
    reverseMapLineSegment(line) {
        return new LineSegment(this.reverseMapPoint(line.start), this.reverseMapPoint(line.end));
    }
}
