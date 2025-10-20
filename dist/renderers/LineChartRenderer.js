import Color from "../model/Color";
import AxisRenderer from "./AxisRenderer";
import GridRenderer from "./GridRenderer";
import LineRenderer from "./LineRenderer";
import OutlineRenderer from "./OutlineRenderer";
import RenderingUtilities from "./RenderingUtilities";
import SideMarginRenderer from "./SideMarginRenderer";
export default class LineChartRenderer {
    renderingContext;
    chartState;
    renderingUtilities;
    constructor(renderingContext, chartState) {
        this.renderingContext = renderingContext;
        this.chartState = chartState;
        this.renderingUtilities = new RenderingUtilities(renderingContext);
    }
    render() {
        this.clear();
        new GridRenderer(this.renderingContext, this.chartState).render();
        new LineRenderer(this.renderingContext, this.chartState).render();
        new SideMarginRenderer(this.renderingContext).render();
        new OutlineRenderer(this.renderingContext, this.chartState).render();
        new AxisRenderer(this.renderingContext, this.chartState).render();
    }
    /**
     * Clear the entire rendering context.
     */
    clear() {
        this.renderingUtilities.resetRenderingContext();
        this.renderingUtilities.fillBackground(new Color("white"));
    }
}
