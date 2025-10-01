import HTMLTemplate from "./LineChart.html.js";
import CSSTemplate from "./LineChart.css.js";
import type Renderer from "../renderers/Renderer.js";
import LineChartState from "../states/LineChartState.js";
import type Polyline from "../utils/Polyline.js";
import LineChartRenderer from "../renderers/LineChartRenderer.js";
import type Rectangle from "../utils/Rectangle.js";

const TAG_NAME = "line-chart";

export default class LineChart extends HTMLElement {
  private chart: HTMLCanvasElement | null = null;
  private renderingContext: CanvasRenderingContext2D | null = null;
  private state = new LineChartState();
  private renderer: Renderer | null = null;
  private _width: number = 500;
  private _height: number = 500;

  /**
   * Creates a new LineChart custom element.
   */
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(HTMLTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(CSSTemplate.content.cloneNode(true));
    this.updateCanvasSize();
  }

  /**
   * Handle the element being added to the DOM.
   */
  async connectedCallback(): Promise<void> {
    this.chart = this.shadowRoot!.querySelector("#chart") ?? null;
    this.updateCanvasSize();

    if (!this.chart) return;

    this.renderingContext = this.chart.getContext("2d");

    this.renderer = new LineChartRenderer(this.renderingContext!, this.state);
    this.renderer.render();
  }

  /**
   * Handle the element being removed from the DOM.
   */
  disconnectedCallback(): void {}

  /**
   * Handle attribute changes.
   */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (oldValue === newValue) {
      return;
    }

    switch (name) {
      case "axisTickInterval":
        this.axisTickInterval = newValue;
        break;
      case "width":
        this.width = newValue;
        break;
      case "height":
        this.height = newValue;
        break;
    }
  }

  /**
   * A list of attributes for the custom element.
   */
  static get observedAttributes(): string[] {
    return ["axisTickInterval", "width", "height"];
  }

  /**
   * Adds a line to the chart.
   * @param line The polyline object to render in the chart.
   */
  public addLine(line: Polyline): void {
    this.state.addLine(line);
    this.renderer?.render();
  }

  /**
   * Removes all lines from the chart.
   */
  public clearLines(): void {
    this.state.clearLines();
    this.renderer?.render();
  }

  /**
   * Sets the chart viewport to the specified rectangle. Note that the coordinates are in chart-space and not in screen-space.
   * @param viewport The rectangle to use as viewport in chart coordinates.
   */
  public setViewport(viewport: Rectangle): void {
    this.state.viewport = viewport;
    this.renderer?.render();
  }

  /**
   * Automatically fit all lines into the viewport.
   * @param options.paddingX An optional padding on the x-axis.
   * @param options.paddingY An optional padding on the y-axis.
   */
  public autoFitViewport(
    options: { paddingX?: number; paddingY?: number } = {},
  ): void {
    this.state.autoFit(options);
    this.renderer?.render();
  }

  /**
   * Sets the interval in pixels between axis ticks.
   * @param interval The target interval between ticks.
   */
  public set axisTickInterval(interval: number | string) {
    this.state.axisTickInterval = Number(interval);
    this.renderer?.render();
  }

  /**
   * The width of the chart canvas in pixels.
   */
  public get width(): number {
    return this._width;
  }

  public set width(value: number | string) {
    const width = Number(value);
    if (!Number.isFinite(width) || width <= 0) {
      throw new TypeError("width must be a positive number");
    }
    this._width = width;
    this.updateCanvasSize();
  }

  /**
   * The height of the chart canvas in pixels.
   */
  public get height(): number {
    return this._height;
  }

  public set height(value: number | string) {
    const height = Number(value);
    if (!Number.isFinite(height) || height <= 0) {
      throw new TypeError("height must be a positive number");
    }
    this._height = height;
    this.updateCanvasSize();
  }

  private updateCanvasSize(): void {
    this.state.canvasWidth = this.width;
    this.state.canvasHeight = this.height;
    if (this.chart) {
      this.chart.width = this.width;
      this.chart.height = this.height;
      this.renderer?.render();
    }
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, LineChart);
}
