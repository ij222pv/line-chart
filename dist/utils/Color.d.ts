/**
 * Represents a color.
 */
export default class Color {
    private cssColor;
    constructor(cssColor?: string);
    /**
     * @return The color as a CSS-compatible string.
     */
    toString(): string;
}
