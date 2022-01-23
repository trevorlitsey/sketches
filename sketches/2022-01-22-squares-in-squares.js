const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath } = require('canvas-sketch-util/penplot');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const SQUARE_WIDTH = 4;
const SQUARE_MARGIN = 0.5;
const PAGE_MARGIN = 1;
const HOW_MANY_LINES = 10;

const makeSquare = ([fromX, fromY], width, howManyLines) => {
  const lines = [];

  for (let i = 0; i <= howManyLines; i++) {
    const inc = (i * width) / howManyLines;
    // add borders
    lines.push([
      [fromX, fromY + inc],
      [fromX + width, fromY + inc],
    ]);
    lines.push([
      [fromX + inc, fromY],
      [fromX + inc, fromY + width],
    ]);
  }

  return lines;
};

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  const howManyAcross = Math.floor((width - PAGE_MARGIN * 2) / SQUARE_WIDTH);
  const howManyDown = Math.floor((height - PAGE_MARGIN * 2) / SQUARE_WIDTH);

  const startX =
    (width -
      SQUARE_WIDTH * howManyAcross -
      SQUARE_MARGIN * (howManyAcross - 1)) /
    2;
  const startY =
    (height - SQUARE_WIDTH * howManyDown - SQUARE_MARGIN * (howManyDown - 1)) /
    2;

  for (let x = 0; x < howManyAcross; x++) {
    for (let y = 0; y < howManyDown; y++) {
      console.log(x * SQUARE_WIDTH + SQUARE_MARGIN);
      lines.push(
        ...makeSquare(
          [
            startX + x * SQUARE_WIDTH + x * SQUARE_MARGIN,
            startY + y * SQUARE_WIDTH + y * SQUARE_MARGIN,
          ],
          SQUARE_WIDTH,
          HOW_MANY_LINES
        )
      );
    }
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
