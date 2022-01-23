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

const NUMBER_OF_SQUARES = 90;

const makeCircleOfSquares = (newCenterPoint, squareWidth) => {
  return Array.from({ length: NUMBER_OF_SQUARES }, (_, i) => {
    const xOrigin = newCenterPoint[0] - squareWidth / 2 + i * 10;
    const yOrigin = newCenterPoint[1] - squareWidth / 2 + i * 10;
    const topLeft = [xOrigin, xOrigin];
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
        rotate(newCenterPoint, point, (i * 90) / 4 / NUMBER_OF_SQUARES)
      )
    );
  }).flatMap((square) => square);
};

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const squareWidth = width * 0.5;
  const circle1 = makeCircleOfSquares([width / 3, height / 3], squareWidth);
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
