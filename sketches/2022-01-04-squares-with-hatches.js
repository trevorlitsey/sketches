const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath } = require('canvas-sketch-util/penplot');
const {
  createHatchLines,
  clipPolylinesToBox,
} = require('canvas-sketch-util/geometry');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  const lines = [];

  for (i = 1; i < width - 1; i++) {
    for (y = 1; y < height - 1; y++) {
      const hatchedBox = createHatchLines(
        [0, 0, width, height],
        (-Math.PI / Math.random()) * 4,
        0.2
      );

      lines.push(
        clipPolylinesToBox(hatchedBox, [
          [i, y],
          [i + 1, y + 1],
        ])
      );

      // add borders
      lines.push(
        createPath((context) => {
          context.rect(i, y, 1, 1);
        })
      );
    }
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
