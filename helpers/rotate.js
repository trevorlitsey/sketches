// oops
// https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
module.exports = function rotate([cx, cy], [x, y], angle) {
  var radians = (Math.PI / 180) * -angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * (x - cx) + sin * (y - cy) + cx,
    ny = cos * (y - cy) - sin * (x - cx) + cy;
  return [nx, ny];
};
