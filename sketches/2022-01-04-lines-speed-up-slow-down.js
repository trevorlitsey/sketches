const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const MARGIN = 1.5;

const sketch = async ({ trimWidth: width, trimHeight: height, ...props }) => {
  let spacing = 0.1;

  const lines = [];

  let y = 0;
  while (y < height) {
    const gap =
      y < height / 2 ? spacing + y * 0.05 : spacing + (height - y) * 0.05;
    const from = [0, y + gap];
    const to = [width, y + gap];

    lines.push([from, to]);

    y += gap;
  }
  // await new Promise((res) => setTimeout(res, 50));
  const box = [MARGIN, MARGIN, width - MARGIN, height - MARGIN];
  const boxedLines = clipPolylinesToBox(lines, box);

  return (props) => renderPaths(boxedLines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
