const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath } = require('canvas-sketch-util/penplot');
const rotate = require('../helpers/rotate');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const NUM = 90;

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  const v = [
    [
      [7, 7],
      [width / 2 - 1, height / 2 - 1],
    ],
    [
      [width / 2 - 1, height / 2 - 1],
      [width - 7, 7],
    ],
  ];

  for (let i = 0; i < NUM; i++) {
    lines.push(
      v.map((points) =>
        points.map((point) => rotate([width / 2, height / 2], point, i * 2))
      )
    );
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
