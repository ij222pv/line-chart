import LineSegment from "./LineSegment";
import Point from "./Point";
import Rectangle from "./Rectangle";
/**
 * Maps points from the reference frame of one rectangle to another.
 */
export default class RectangleMapper {
    private source;
    private target;
    constructor(from: Rectangle, to: Rectangle);
    /**
     * Maps a point from the reference frame of one rectangle to another. The point
     * will keep its relative position in the new rectangle.
     * For example, a point in the center of the source
     * rectangle will be mapped to the center of the target
     * rectangle.
     */
    mapPoint(point: Point): Point;
    /**
     * Maps a point relative to the target rectangle back to the source rectangle.
     */
    reverseMapPoint(point: Point): Point;
    /**
     * Maps a rectangle from one reference frame to another. The rectangle
     * will keep its relative position in the new rectangle.
     * For example, a rectangle half the size of the source
     * rectangle will be mapped to a rectangle half the size of the target
     * rectangle.
     */
    mapRectangle(rectangle: Rectangle): Rectangle;
    /**
     * Maps a rectangle from the reference frame of the target rectangle back to the source rectangle.
     */
    reverseMapRectangle(rectangle: Rectangle): Rectangle;
    /**
     * Maps a line segment from one reference frame to another. The line segment
     * will keep its relative position in the new rectangle.
     */
    mapLineSegment(line: LineSegment): LineSegment;
    /**
     * Maps a line segment from the reference frame of the target rectangle back to the source rectangle.
     */
    reverseMapLineSegment(line: LineSegment): LineSegment;
}
