const canvasSketch = require("canvas-sketch");
const { renderPaths } = require("canvas-sketch-util/penplot");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");

const settings = {
  dimensions: "A4",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
};

const NUMBER_OF_LINES = 300;
const RANDOMNESS = 50;

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  const spacing = height / NUMBER_OF_LINES;
  const lines = Array.from({ length: NUMBER_OF_LINES }, (_, i) => {
    const from = [
      0,
      (i + 0.5) * spacing + Math.random() * RANDOMNESS - RANDOMNESS / 2,
    ];
    const to = [
      width,
      (i + 0.5) * spacing + Math.random() * RANDOMNESS - RANDOMNESS / 2,
    ];

    return [from, to];
  });
  console.log(lines);
  const margin = 100;
  const box = [margin, margin, width - margin, height - margin];
  const boxedLines = clipPolylinesToBox(lines, box);

  return (props) => renderPaths(boxedLines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
