export default class Color {
    cssColor;
    /**
     * Creates a new Color instance.
     * @param cssColor The color as a CSS-compatible string, e.g. "red", "#FF0000" or "rgb(255,0,0)".
     */
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
