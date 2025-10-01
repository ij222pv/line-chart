import type Polyline from "../utils/Polyline.js";
import type Rectangle from "../utils/Rectangle.js";
export default class LineChart extends HTMLElement {
    private chart;
    private renderingContext;
    private state;
    private renderer;
    private _width;
    private _height;
    /**
     * Creates a new LineChart custom element.
     */
    constructor();
    /**
     * Handle the element being added to the DOM.
     */
    connectedCallback(): Promise<void>;
    /**
     * Handle the element being removed from the DOM.
     */
    disconnectedCallback(): void;
    /**
     * Handle attribute changes.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * A list of attributes for the custom element.
     */
    static get observedAttributes(): string[];
    /**
     * Adds a line to the chart.
     * @param line The polyline object to render in the chart.
     */
    addLine(line: Polyline): void;
    /**
     * Removes all lines from the chart.
     */
    clearLines(): void;
    /**
     * Sets the chart viewport to the specified rectangle. Note that the coordinates are in chart-space and not in screen-space.
     * @param viewport The rectangle to use as viewport in chart coordinates.
     */
    setViewport(viewport: Rectangle): void;
    /**
     * Automatically fit all lines into the viewport.
     * @param options.paddingX An optional padding on the x-axis.
     * @param options.paddingY An optional padding on the y-axis.
     */
    autoFitViewport(options?: {
        paddingX?: number;
        paddingY?: number;
    }): void;
    /**
     * Sets the interval in pixels between axis ticks.
     * @param interval The target interval between ticks.
     */
    set axisTickInterval(interval: number | string);
    /**
     * The width of the chart canvas in pixels.
     */
    get width(): number;
    set width(value: number | string);
    /**
     * The height of the chart canvas in pixels.
     */
    get height(): number;
    set height(value: number | string);
    private updateCanvasSize;
}
