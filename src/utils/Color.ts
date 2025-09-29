/**
 * Represents a color.
 */
export default class Color {
  constructor(private cssColor: string = "black") {}

  /**
   * @return The color as a CSS-compatible string.
   */
  toString(): string {
    return this.cssColor;
  }
}
