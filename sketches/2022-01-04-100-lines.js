const canvasSketch = require("canvas-sketch");
const { renderPaths, createPath } = require("canvas-sketch-util/penplot");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");

const settings = {
  dimensions: "A4",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

const getPoint = (scale = 1) => [Math.random() * scale, Math.random() * scale];

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  // Create shapes with path interface
  const shapes = Array.from({ length: 10 }, (k, i) => {
    return createPath((context) => {
      // now draw five filled circle pieces:
      const start = Math.random() * 2;
      const end = Math.random() * (2 - start);
      context.arc(
        width / 2,
        height / 2,
        10 - i,
        start * Math.PI,
        end * Math.PI
      );
    });
  });

  // Combine into an array or nested array
  const paths = shapes;

  // Export both PNG and SVG files on 'Cmd + S'
  return (props) => renderPaths(paths, props);

  // const margin = 1.0;
  // const box = [margin, margin, width - margin, height - margin];
  // const boxedLines = clipPolylinesToBox(lines, box);

  // return (props) => renderPaths(boxedLines, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
