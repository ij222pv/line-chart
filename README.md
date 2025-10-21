# Line chart

![Version](https://img.shields.io/github/package-json/v/ij222pv/line-chart)
![License](https://img.shields.io/github/license/ij222pv/line-chart)

[Link to demo app](https://github.com/ij222pv/line-chart-test)

This is a JavaScript module for creating simple line charts in web applications. It allows you to create line charts with multiple lines, customize line colors and thicknesses, and automatically adjust the viewport to fit the data.

## Installation

You can install the library using npm:

```bash
npm install ij222pv/line-chart
```

## Example usage

```javascript
import { LineChart, Point, Polyline, Color } from "line-chart";

const points = [
  new Point(0, 0),
  new Point(1, 2),
  new Point(2, 1),
  new Point(3, 3),
  new Point(4, 0),
];

const lineChart = new LineChart();
lineChart.addLine(
  new Polyline(points, {
    color: new Color("hsl(200, 100%, 50%)"),
    thickness: 5,
  })
);
lineChart.autoFitViewport({
  paddingY: 60,
  paddingX: 20,
});
document.body.appendChild(lineChart);
```

![Example chart](.readme/example-chart.png)

## Public API
### **LineChart**
```typescript
addLine(line: Polyline): void
```

Adds a line to the chart.

```typescript
clearLines(): void
```

Removes all lines from the chart.

```typescript
setViewport(viewport: Rectangle)
```

Sets the viewport of the chart to the specified rectangle, in chart coordinates.

```typescript
autoFitViewport(options: Object): void
```

Automatically adjusts the viewport to fit all lines.

The `options` object may contain:

`paddingX: number` - The padding in pixels on the x-axis between chart lines and chart edge.

`paddingY: number` - The padding in pixels on the y-axis between chart lines and chart edge.

```typescript
axisTickInterval
```

The target interval in pixels between axis ticks. The actual interval will differ from this value to ensure that ticks are at "nice" values.

```typescript
width
```

The width of the chart canvas in pixels. Defaults to 500.

```typescript
height
```

The height of the chart canvas in pixels. Defaults to 500.

### **Polyline**
```typescript
constructor(points: Point[], options?: Object)
```

The `options` object may contain:

`color: Color` - The color of the line. The default is black.

`thickness: number` - The thickness of the line in pixels. The default is 1.

```typescript
points {readonly}
```

An array of Point objects representing the vertices of the polyline.

```typescript
color {readonly}
```

The color of the line.

```typescript
thickness {readonly}
```

The thickness of the line in pixels.

### **Point**
```typescript
constructor(x: number, y: number)
```

Creates a point with the specified x and y coordinates.

```typescript
x {readonly}
```

The x coordinate of the point.

```typescript
y {readonly}
```

The y coordinate of the point.

### **Color**
```typescript
constructor(cssColor: String)
```

`cssColor` is a CSS color string such as "red" or "hsl(200, 100%, 50%)". The default is "black";

More examples are available at https://developer.mozilla.org/en-US/docs/Web/CSS/color_value

```typescript
toString(): String
```

Get the color as a CSS-compatible string.

### **Rectangle**
```typescript
constructor(topLeftPoint: Point, bottomRightPoint: Point)
```

```typescript
topLeft: Point {readonly}
```

```typescript
topRight: Point {readonly}
```

```typescript
bottomRight: Point {readonly}
```

```typescript
bottomLeft: Point {readonly}
```

```typescript
top: number {readonly}
```

```typescript
right: number {readonly}
```

```typescript
bottom: number {readonly}
```

```typescript
left: number {readonly}
```

```typescript
width: number {readonly}
```

```typescript
height: number {readonly}
```

## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue.

If you want to contribute code, please fork the repository and create a pull request with your modifications.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.