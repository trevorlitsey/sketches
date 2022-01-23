const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'px',
};

const PAGE_MARGIN = 50;
const HOW_MANY_LINES = 100; // plus one :)
const GAP_SIZE = 50;

const makeLines = ([fromX, fromY], width, height) => {
  const lines = [];

  for (let i = 0; i <= HOW_MANY_LINES; i++) {
    const x = fromX + i * (width / HOW_MANY_LINES);
    let y = fromY;
    while (y < fromY + height) {
      const newY = y + (height * Math.random()) / 10;
      console.log(newY);
      lines.push([
        [x, y],
        [x, newY > y + height ? y + height : newY],
      ]);
      y = newY + GAP_SIZE;
    }
  }

  return lines;
};

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];
  lines.push(
    ...makeLines(
      [0 + PAGE_MARGIN, 0 + PAGE_MARGIN],
      width - PAGE_MARGIN * 2,
      height - PAGE_MARGIN * 2
    )
  );

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
