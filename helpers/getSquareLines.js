module.exports = function getSquareLines([xOrigin, yOrigin], width) {
  const topLeft = [xOrigin, yOrigin];
  const topRight = [xOrigin + width, yOrigin];
  const bottomRight = [xOrigin + width, yOrigin + width];
  const bottomLeft = [xOrigin, yOrigin + width];

  return [
    [topLeft, topRight],
    [topRight, bottomRight],
    [bottomRight, bottomLeft],
    [bottomLeft, topLeft],
  ];
};
