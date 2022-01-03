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

const getPoint = (scale = 1) => [Math.random() * scale, Math.random() * scale];

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  console.log(props);
  const lines = Array.from({ length: 100 }, () => {
    const from = getPoint(width);
    const to = getPoint(height);

    return [from, to];
  });

  const margin = 1.0;
  const box = [margin, margin, width - margin, height - margin];
  const boxedLines = clipPolylinesToBox(lines, box);

  return (props) => renderPaths(boxedLines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
