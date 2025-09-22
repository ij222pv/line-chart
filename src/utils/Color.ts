/**
 * Represents a color.
 */
export default class Color {
  private red: number = 0;
  private green: number = 0;
  private blue: number = 0;

  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  /**
   * @return The color as a CSS-compatible string.
   */
  toString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }
}