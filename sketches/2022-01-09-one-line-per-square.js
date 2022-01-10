const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const rotate = require('../helpers/rotate');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const PAGE_MARGIN = 1;
const SQUARE_MARGIN = 0.2;
const SQUARE_WIDTH = 1;

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  const lines = [];

  const howManySquaresAcross = (width - PAGE_MARGIN * 2) / SQUARE_WIDTH;
  const howManySquaresDown = (height - PAGE_MARGIN * 2) / SQUARE_WIDTH;
  for (let x = 0; x < howManySquaresAcross; x++) {
    for (let y = 0; y < howManySquaresDown; y++) {
      const xOrigin = PAGE_MARGIN + x;
      const yOrigin = PAGE_MARGIN + y;

      const num = Math.floor(Math.random() * 4);

      switch (num) {
        //  vertical
        case 0:
          lines.push([
            [xOrigin + SQUARE_WIDTH / 2, yOrigin],
            [xOrigin + SQUARE_WIDTH / 2, yOrigin + SQUARE_WIDTH],
          ]);
          break;
        //  horizontal
        case 1:
          lines.push([
            [xOrigin, yOrigin + SQUARE_WIDTH / 2],
            [xOrigin + SQUARE_WIDTH, yOrigin + SQUARE_WIDTH / 2],
          ]);
          break;
        //  top left to bottom right
        case 2:
          lines.push([
            [xOrigin, yOrigin],
            [xOrigin + SQUARE_WIDTH, yOrigin + SQUARE_WIDTH],
          ]);
          break;
        //  bottom left to top right
        case 3:
          lines.push([
            [xOrigin, yOrigin + SQUARE_WIDTH],
            [xOrigin + SQUARE_WIDTH, yOrigin],
          ]);
      }
    }
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
