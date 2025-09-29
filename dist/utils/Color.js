/**
 * Represents a color.
 */
export default class Color {
    cssColor;
    constructor(cssColor = "black") {
        this.cssColor = cssColor;
    }
    /**
     * @return The color as a CSS-compatible string.
     */
    toString() {
        return this.cssColor;
    }
}
