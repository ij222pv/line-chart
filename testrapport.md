# Test report

Testing of the module is done manually by visiting the test app and visually inspecting the rendered charts. The git repository for the test app is available at https://github.com/ij222pv/line-chart-test

## Tests

### TC1
**Description:** Render a simple line chart with default options.

**Expected result**: 

![Test case 1](.readme/tests/tc1.png)

### TC2
**Description:** Render a line chart with padding between line and chart edge.

**Expected result**:

![Test case 2](.readme/tests/tc2.png)

### TC3
**Description:** Render a line chart with custom colors and line thickness.

**Expected result**:

![Test case 3](.readme/tests/tc3.png)

### TC4
**Description:** Render a line chart with multiple lines with different color and thickness.

**Expected result**:

![Test case 4](.readme/tests/tc4.png)

### TC5
**Description:** Ticks along the x and y axes should always be placed at "nice" intervals. "nice" intervals are a number in the pattern 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, etc.

**Steps**:
1. Move the slider above the chart to the very left and slowly move it all the way to the right.
2. Observe that the chart's size increases in both axes.
2. Confirm that the interval between ticks on both axes are always a "nice" interval as described earlier.

**Expected result**:

Note how the interval between ticks on the x-axis is 0.5, and the interval between ticks on the y-axis is 0.2, both of which are "nice" intervals.

![Test case 5](.readme/tests/tc5.png)
