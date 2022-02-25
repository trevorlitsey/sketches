const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');

const settings = {
  dimensions: [5, 7],
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'in',
};

const SQUARE_WIDTH = 0.75;
const SQUARE_MARGIN = 0.25;
const PAGE_MARGIN = 1;
const HOW_MANY_LINES = 10; // plus one :)
const GAP_SIZE = 0.05;

const makeLines = ([fromX, fromY], width, height) => {
  const lines = [];

  for (let i = 0; i <= HOW_MANY_LINES; i++) {
    const x = fromX + i * (width / HOW_MANY_LINES);
    let y = fromY;
    while (y <= fromY + height) {
      const newY = y + height * Math.random();
      lines.push([
        [x, y],
        [x, newY + GAP_SIZE >= fromY + height ? fromY + height : newY],
      ]);
      y = newY + GAP_SIZE;
    }
  }

  return lines;
};

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  const howManyAcross = Math.floor((width - PAGE_MARGIN * 2) / SQUARE_WIDTH);
  const howManyDown = Math.floor(
    (height - PAGE_MARGIN * 2) / (SQUARE_WIDTH + SQUARE_MARGIN * 0.25)
  );

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
      lines.push(
        ...makeLines(
          [
            startX + x * SQUARE_WIDTH + x * SQUARE_MARGIN,
            startY + y * SQUARE_WIDTH + y * SQUARE_MARGIN,
          ],
          SQUARE_WIDTH,
          SQUARE_WIDTH
        )
      );
    }
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
