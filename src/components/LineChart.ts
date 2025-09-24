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

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot?.appendChild(HTMLTemplate.content.cloneNode(true));
    this.shadowRoot?.appendChild(CSSTemplate.content.cloneNode(true));
  }

  /**
   * Handle the element being added to the DOM.
   */
  async connectedCallback(): Promise<void> {
    this.chart = this.shadowRoot!.querySelector("#chart") ?? null;

    if (!this.chart) return;

    this.chart.width = 800;
    this.chart.height = 800;

    this.state.canvasWidth = this.chart.width;
    this.state.canvasHeight = this.chart.height;
    this.renderingContext = this.chart.getContext("2d");

    this.renderer = new LineChartRenderer(this.renderingContext!, this.state);
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
      case "axisInterval":
        this.axisInterval = newValue;
        break;
      case "linePaddingX":
        this.linePaddingX = newValue;
        break;
      case "linePaddingY":
        this.linePaddingY = newValue;
        break;
    }
  }

  /**
   * A list of attributes for the custom element.
   */
  static get observedAttributes(): string[] {
    return ["axisInterval", "linePaddingX", "linePaddingY"];
  }

  public addLine(line: Polyline) {
    this.state.addLine(line);
    this.renderer?.render();
  }

  public clearLines() {
    this.state.clearLines();
    this.renderer?.render();
  }

  public setViewport(viewport: Rectangle) {
    this.state.viewport = viewport;
    this.renderer?.render();
  }

  public autoFit(options: { paddingX?: number, paddingY?: number } = {}): void {
    this.state.autoFit(options);
    this.renderer?.render();
  }

  /**
   * Sets the interval in pixels between axis ticks. Set to 0 to disable ticks.
   */
  public set axisInterval(interval: number | string) {
    this.state.axisTickInterval = Number(interval);
    this.renderer?.render();
  }

  public set linePaddingX(padding: number | string) {
    this.state.paddingX = Number(padding);
    this.renderer?.render();
  }

  public set linePaddingY(padding: number | string) {
    this.state.paddingY = Number(padding);
    this.renderer?.render();
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, LineChart);
}
