const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath } = require('canvas-sketch-util/penplot');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const NUM = 11;
const MARGIN = 1;

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  for (let i = 0; i < NUM; i++) {
    const getX = (x) => MARGIN + x + i * 0.4;
    const getY = (y) => MARGIN + y + i * 0.4;

    // add borders
    lines.push([
      [getX(5), getY(15)],
      [getX(5), getY(5)],
    ]);
    lines.push([
      [getX(5), getY(5)],
      [getX(15), getY(5)],
    ]);
    lines.push([
      [getX(10), getY(0)],
      [getX(10), getY(10)],
    ]);
    lines.push([
      [getX(10), getY(10)],
      [getX(0), getY(10)],
    ]);
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
