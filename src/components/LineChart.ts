import template from "./LineChart.html.js";

const TAG_NAME = "line-chart";

export default class LineChart extends HTMLElement {
  private chart: HTMLCanvasElement | null = null;
  private renderingContext: CanvasRenderingContext2D | null = null;

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      template.content.cloneNode(true),
    );
  }

  async connectedCallback(): Promise<void> {
    this.chart = this.shadowRoot!.querySelector("#chart") ?? null;

    if (!this.chart) return;

    this.renderingContext = this.chart.getContext("2d");
  }

  disconnectedCallback(): void {

  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) {
      return;
    }
  }

  static get observedAttributes(): string[] {
    return [];
  }
}

if (!customElements.get(TAG_NAME)) {
  customElements.define(TAG_NAME, LineChart);
}
