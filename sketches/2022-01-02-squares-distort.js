const canvasSketch = require('canvas-sketch');
const { renderPaths } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
};

const NUMBER_OF_SQUARES = 100;
const MARGIN = 50;

// Start the sketchi
const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  const spacing = width / 2 / NUMBER_OF_SQUARES;
  const lines = Array.from({ length: NUMBER_OF_SQUARES }, (_, i) => {
    const push = i * 5;
    const yOffset = (height - width) / 2;
    const xOrigin = MARGIN + i * spacing;
    const yOrigin = MARGIN + yOffset + i * spacing;
    const squareWidth = width - xOrigin * 2;
    console.log({ i, spacing, xOrigin, yOrigin, height, width });
    const topLeft = [xOrigin - push, yOrigin - push];
    const topRight = [xOrigin + squareWidth, yOrigin];
    const bottomRight = [xOrigin + squareWidth, yOrigin + squareWidth];
    const bottomLeft = [xOrigin, yOrigin + squareWidth];
    console.log(topLeft);
    return [
      [topLeft, topRight],
      [topRight, bottomRight],
      [bottomRight, bottomLeft],
      [bottomLeft, topLeft],
    ];
  }).flatMap((square) => square);

  const margin = 100;
  const box = [margin, margin, width - margin, height - margin];
  const boxedLines = lines; // clipPolylinesToBox(lines, box);
  console.log(lines);
  return (props) => renderPaths(boxedLines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
