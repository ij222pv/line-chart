import template from "./LineChart.html.js";
import type Renderer from "../renderers/Renderer.js";
import RendererFactoryImpl from "../renderers/RendererFactoryImpl.js";
import LineChartState from "../states/LineChartState.js";
import type Point from "../utils/Point.js";

const TAG_NAME = "line-chart";

export default class LineChart extends HTMLElement {
  private chart: HTMLCanvasElement | null = null;
  private renderingContext: CanvasRenderingContext2D | null = null;
  private state = new LineChartState();
  private renderer: Renderer | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true),
    );

    const rendererFactory = new RendererFactoryImpl();
    this.renderer = rendererFactory.makeRenderer(this.state);
  }

  /**
   * Handle the element being added to the DOM.
   */
  async connectedCallback(): Promise<void> {
    this.chart = this.shadowRoot!.querySelector("#chart") ?? null;

    if (!this.chart) return;

    this.state.pixelWidth = this.chart.width;
    this.state.pixelHeight = this.chart.height;
    this.renderingContext = this.chart.getContext("2d");
  }

  /**
   * Handle the element being removed from the DOM.
   */
  disconnectedCallback(): void {

  }

  /**
   * Handle attribute changes.
   */
  attributeChangedCallback(_name: string, oldValue: string, newValue: string): void {
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
  public setPoints(points: Point[]) {
    this.state.setPoints(points);
    if (!this.renderingContext) return;
    this.renderer?.render(this.renderingContext!, this.state);
  }

  /**
   * Sets the interval between scale markings on the x-axis.
   * For example, if the interval is set to 5, there may be a marking at x=0, x=5, x=10, etc.
   */
  public set scaleInterval(interval: number) {
    this.state.scaleInterval = interval;
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, LineChart);
}
