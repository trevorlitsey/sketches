const canvasSketch = require('canvas-sketch');
const { renderPaths, createPath } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');

const settings = {
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const NUM_OF_CIRCLES = 40;
const MARGIN = 1;

// Start the sketch
const sketch = ({ trimWidth: width, trimHeight: height, ...props }) => {
  // Create shapes with path interface
  const paths = [];
  for (let i = 2; i < NUM_OF_CIRCLES; i++) {
    const path = createPath((context) => {
      // now draw five filled circle pieces:
      const start = Math.random() * 2;
      const end = Math.random() * (2 - start);
      context.arc(
        width / 2,
        height / 2,
        ((width - MARGIN * 2) / 2 / NUM_OF_CIRCLES) * i,
        start * Math.PI,
        end * Math.PI
      );
    });
    paths.push(path);
  }

  // Export both PNG and SVG files on 'Cmd + S'
  return (props) => renderPaths(paths, props);
};

// Start the sketch with parameters
canvasSketch(sketch, settings);
