const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');
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

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const hatchedBox = createHatchLines([0, 0, width, height], -Math.PI / 4, 0.1);

  // Combine into an array or nested array
  const box1 = clipPolylinesToBox(hatchedBox, [
    [(width / 12) * 1.5, height * 0.1],
    [(width / 12) * 5, height * 0.9],
  ]);

  const box2 = clipPolylinesToBox(hatchedBox, [
    [(width / 12) * 7, height * 0.1],
    [(width / 12) * 10.5, height * 0.9],
  ]);

  const paths = [box1, box2];

  return (props) => renderPaths(paths, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
