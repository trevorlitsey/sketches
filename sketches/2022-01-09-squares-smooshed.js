const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');
const rotate = require('../helpers/rotate');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const PAGE_MARGIN = 1;
const SQUARE_MARGIN = 0.1;
const SQUARE_WIDTH = 0.25;

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  const howManySquaresAcross = width / (SQUARE_WIDTH + SQUARE_MARGIN * 2);
  const howManySquaresDown = height / (SQUARE_WIDTH + SQUARE_MARGIN * 2);
  for (let x = 0; x < howManySquaresAcross; x++) {
    for (let y = 0; y < howManySquaresDown; y++) {
      const xOrigin = PAGE_MARGIN + x * (SQUARE_WIDTH + SQUARE_MARGIN);
      const yOrigin = PAGE_MARGIN + y * (SQUARE_WIDTH + SQUARE_MARGIN);
      console.log(yOrigin);
      const [topLeft, topRight, bottomRight, bottomLeft] = [
        [xOrigin, yOrigin],
        [xOrigin + SQUARE_WIDTH, yOrigin],
        [xOrigin + SQUARE_WIDTH, yOrigin + SQUARE_WIDTH],
        [xOrigin, yOrigin + SQUARE_WIDTH],
      ].map((point) =>
        rotate(
          [xOrigin + SQUARE_WIDTH / 2, yOrigin + SQUARE_WIDTH / 2],
          point,
          Math.random() * 20 - 10
        )
      );

      lines.push(
        [topLeft, topRight],
        [topRight, bottomRight],
        [bottomRight, bottomLeft],
        [bottomLeft, topLeft]
      );
    }
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
