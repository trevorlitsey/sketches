const canvasSketch = require('canvas-sketch');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const { renderPaths } = require('canvas-sketch-util/penplot');
const rotate = require('../helpers/rotate');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const HOW_MANY_LINES = 45;

const MARGIN = 1;

// Start the sketch
const sketch = ({ trimWidth: width }) => {
  const lines = [];
  const deg = 91 / HOW_MANY_LINES;

  const start1 = [width * 2, 0];
  const end1 = [0 + MARGIN, 0 + MARGIN];

  for (let i = 1; i < HOW_MANY_LINES; i++) {
    lines.push([rotate(end1, start1, deg * i), end1]);
  }

  // const start2 = [-width, width];
  // const end2 = [width - MARGIN, width - MARGIN];

  // for (let i = 0; i < HOW_MANY_LINES; i++) {
  //   lines.push([end2, rotate(end2, start2, deg * i)]);
  // }

  // const start3 = [0, -width];
  // const end3 = [0 + MARGIN, width - MARGIN];

  // for (let i = 0; i < HOW_MANY_LINES; i++) {
  //   lines.push([end3, rotate(end3, start3, deg * i)]);
  // }

  // const start4 = [width, width * 2];
  // const end4 = [width - MARGIN, 0 + MARGIN];

  // for (let i = 0; i < HOW_MANY_LINES; i++) {
  //   lines.push([end4, rotate(end4, start4, deg * i)]);
  // }

  // Clip all the lines to a margin
  const box = [MARGIN, MARGIN, width - MARGIN, width - MARGIN];
  const boxedLines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return (props) => renderPaths(boxedLines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
