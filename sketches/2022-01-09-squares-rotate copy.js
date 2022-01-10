const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const rotate = require('../helpers/rotate');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
};

const NUMBER_OF_SQUARES = 100;
const MARGIN = 100;

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  const spacing = (width - MARGIN) / 2 / NUMBER_OF_SQUARES;
  const lines = Array.from({ length: NUMBER_OF_SQUARES }, (_, i) => {
    const yOffset = (height - width) / 2;
    const xOrigin = MARGIN + i * spacing;
    const yOrigin = MARGIN + yOffset + i * spacing;
    const squareWidth = width - xOrigin * 2;

    const topLeft = [xOrigin, yOrigin];
    const topRight = [xOrigin + squareWidth, yOrigin];
    const bottomRight = [xOrigin + squareWidth, yOrigin + squareWidth];
    const bottomLeft = [xOrigin, yOrigin + squareWidth];

    return [
      [topLeft, topRight],
      [topRight, bottomRight],
      [bottomRight, bottomLeft],
      [bottomLeft, topLeft],
    ].map((points) =>
      points.map((point) => rotate([width / 2, height / 2], point, i))
    );
  }).flatMap((square) => square);

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
