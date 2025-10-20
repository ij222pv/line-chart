export default class Color {
  /**
   * Creates a new Color instance.
   * @param cssColor The color as a CSS-compatible string, e.g. "red", "#FF0000" or "rgb(255,0,0)".
   */
  constructor(private cssColor: string = "black") {}

  /**
   * @return The color as a CSS-compatible string.
   */
  toString(): string {
    return this.cssColor;
  }
}
