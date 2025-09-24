import HTMLTemplate from "./LineChart.html.js";
import CSSTemplate from "./LineChart.css.js";
import type Renderer from "../renderers/Renderer.js";
import LineChartState from "../states/LineChartState.js";
import type Polyline from "../utils/Polyline.js";
import LineChartRenderer from "../renderers/LineChartRenderer.js";

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
    _name: string,
    oldValue: string,
    newValue: string,
  ): void {
    if (oldValue === newValue) {
      return;
    }
  }

  /**
   * A list of attributes for the custom element.
   */
  static get observedAttributes(): string[] {
    return [];
  }

  /**
   * Define the points in the line chart.
   */
  public addLine(line: Polyline) {
    this.state.addLine(line);
    if (!this.renderingContext) return;
    this.renderer?.render(this.renderingContext!, this.state);
  }

  public clearLines() {
    this.state.clearLines();
  }

  /**
   * Sets the interval between scale markings on the x-axis.
   * For example, if the interval is set to 5, there may be a marking at x=0, x=5, x=10, etc.
   */
  public set scaleInterval(interval: number) {
    this.state.axisTickInterval = interval;
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, LineChart);
}
