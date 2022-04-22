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

const NUM = 30;

const sketch = ({ trimWidth: width, trimHeight: height }) => {
  const lines = [];

  const v = [
    [
      [7, 7],
      [width / 2 + 2, height / 2],
    ],
  ];

  for (let i = 0; i < NUM; i++) {
    lines.push(
      v.map((points) => points.map((point) => rotate([8, 10], point, i * 4)))
    );
  }

  return (props) => renderPaths(lines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
