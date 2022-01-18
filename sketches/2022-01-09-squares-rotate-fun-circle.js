const canvasSketch = require('canvas-sketch');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const { renderPaths } = require('canvas-sketch-util/penplot');
const rotate = require('../helpers/rotate');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
};

const NUMBER_OF_SQUARES = 45;

const makeCircleOfSquares = (centerPoint, squareWidth) => {
  return Array.from({ length: NUMBER_OF_SQUARES }, (_, i) => {
    const xOrigin = centerPoint[0] - squareWidth / 2;
    const yOrigin = centerPoint[1] - squareWidth / 2;
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
      points.map((point) =>
        rotate(centerPoint, point, (i * 90) / NUMBER_OF_SQUARES)
      )
    );
  }).flatMap((square) => square);
};

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const squareWidth = width * 0.5;
  const circle1 = makeCircleOfSquares([width / 2, height / 2], squareWidth);
  // const circle2 = makeCircleOfSquares([width / 2, height / 2], squareWidth);
  // const circle3 = makeCircleOfSquares(
  //   [width / 2, (height / 5) * 5],
  //   squareWidth
  // );

  const lines = [...circle1];

  const box = [0, 0, width, height];
  const boxedLines = clipPolylinesToBox(lines, box);

  return (props) => renderPaths(boxedLines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
