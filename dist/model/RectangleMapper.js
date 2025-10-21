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
        const relativeToSource = this.translatePointFromSource(point);
        const scaledToTarget = this.scalePointToTarget(relativeToSource);
        const mappedToTarget = this.translatePointToTarget(scaledToTarget);
        return mappedToTarget;
    }
    translatePointFromSource(point) {
        return new Point(point.x - this.source.left, point.y - this.source.top);
    }
    scalePointToTarget(point) {
        return new Point((point.x / this.source.width) * this.target.width, (point.y / this.source.height) * this.target.height);
    }
    translatePointToTarget(point) {
        return new Point(point.x + this.target.left, point.y + this.target.top);
    }
    /**
     * Maps a point relative to the target rectangle back to the source rectangle.
     */
    reverseMapPoint(point) {
        const relativeToTarget = this.translatePointFromTarget(point);
        const scaledToSource = this.scalePointToSource(relativeToTarget);
        const mappedToSource = this.translatePointToSource(scaledToSource);
        return mappedToSource;
    }
    translatePointFromTarget(point) {
        return new Point(point.x - this.target.left, point.y - this.target.top);
    }
    scalePointToSource(point) {
        return new Point((point.x / this.target.width) * this.source.width, (point.y / this.target.height) * this.source.height);
    }
    translatePointToSource(point) {
        return new Point(point.x + this.source.left, point.y + this.source.top);
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
