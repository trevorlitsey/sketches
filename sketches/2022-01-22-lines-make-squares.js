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

const makeLines = ([fromX, fromY], [toX, toY], moveByX, moveByY, howMany) => {
  const lines = [];

  for (let i = 0; i < howMany; i++) {
    const getX = (x) => MARGIN + x + i * moveByX;
    const getY = (y) => MARGIN + y + i * moveByY;

    // add borders
    lines.push([
      [getX(fromX), getY(fromY)],
      [getX(toX), getY(toY)],
    ]);
  }

  return lines;
};

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  const m = (from, to, moveByX = 0.4, moveByY = 0.4, howMany = NUM) =>
    makeLines(from, to, moveByX, moveByY, howMany);

  lines.push(...m([7, 0], [7, 24]));

  const by = 7;
  for (let i = 0; i < 3; i++) {
    const y = 5 + i * by;
    lines.push(...m([0, y], [14, y], undefined, undefined, 10));
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
