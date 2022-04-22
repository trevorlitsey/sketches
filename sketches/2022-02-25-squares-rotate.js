const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');
const getSquareLines = require('../helpers/getSquareLines');
const rotate = require('../helpers/rotate');

const settings = {
  dimensions: [10, 15], // 8.5 x 11
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};
const MARGIN = 0.1;
const WIDTH = 1;
const START = Math.floor(Math.random() * 90);

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      lines.push(
        getSquareLines([x + MARGIN, y + MARGIN], WIDTH - MARGIN).map((fromTo) =>
          fromTo.map(([fromToX, fromToY]) =>
            rotate(
              [x + WIDTH / 2, y + WIDTH / 2],
              [fromToX, fromToY],
              (START + x + y - 2) * 2
            )
          )
        )
      );
    }
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
