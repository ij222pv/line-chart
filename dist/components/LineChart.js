import HTMLTemplate from "./LineChart.html.js";
import CSSTemplate from "./LineChart.css.js";
import LineChartState from "../states/LineChartState.js";
import LineChartRenderer from "../renderers/LineChartRenderer.js";
const TAG_NAME = "line-chart";
export default class LineChart extends HTMLElement {
    chart = null;
    renderingContext = null;
    state = new LineChartState();
    renderer = null;
    _width = 500;
    _height = 500;
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
    async connectedCallback() {
        this.chart = this.shadowRoot.querySelector("#chart") ?? null;
        this.updateCanvasSize();
        if (!this.chart)
            return;
        this.renderingContext = this.chart.getContext("2d");
        this.renderer = new LineChartRenderer(this.renderingContext, this.state);
        this.renderer.render();
    }
    /**
     * Handle the element being removed from the DOM.
     */
    disconnectedCallback() { }
    /**
     * Handle attribute changes.
     */
    attributeChangedCallback(name, oldValue, newValue) {
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
    static get observedAttributes() {
        return ["axisTickInterval", "width", "height"];
    }
    /**
     * Adds a line to the chart.
     * @param line The polyline object to render in the chart.
     */
    addLine(line) {
        this.state.addLine(line);
        this.renderer?.render();
    }
    /**
     * Removes all lines from the chart.
     */
    clearLines() {
        this.state.clearLines();
        this.renderer?.render();
    }
    /**
     * Sets the chart viewport to the specified rectangle. Note that the coordinates are in chart-space and not in screen-space.
     * @param viewport The rectangle to use as viewport in chart coordinates.
     */
    setViewport(viewport) {
        this.state.viewport = viewport;
        this.renderer?.render();
    }
    /**
     * Automatically fit all lines into the viewport.
     * @param options.paddingX An optional padding on the x-axis.
     * @param options.paddingY An optional padding on the y-axis.
     */
    autoFitViewport(options = {}) {
        this.state.autoFit(options);
        this.renderer?.render();
    }
    /**
     * Sets the interval in pixels between axis ticks.
     * @param interval The target interval between ticks.
     */
    set axisTickInterval(interval) {
        this.state.axisTickInterval = Number(interval);
        this.renderer?.render();
    }
    /**
     * The width of the chart canvas in pixels.
     */
    get width() {
        return this._width;
    }
    set width(value) {
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
    get height() {
        return this._height;
    }
    set height(value) {
        const height = Number(value);
        if (!Number.isFinite(height) || height <= 0) {
            throw new TypeError("height must be a positive number");
        }
        this._height = height;
        this.updateCanvasSize();
    }
    updateCanvasSize() {
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
