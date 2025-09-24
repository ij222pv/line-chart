/**
 * Represents a color.
 */
export default class Color {
  private cssColor: string;

  constructor(cssColor: string = "black") {
    this.cssColor = cssColor;
  }

  /**
   * @return The color as a CSS-compatible string.
   */
  toString(): string {
    return this.cssColor;
  }
}
