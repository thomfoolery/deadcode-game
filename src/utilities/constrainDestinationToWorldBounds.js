function roundToGrid(position, gridSize) {
  const x = Math.round(position.x / gridSize) * gridSize;
  const y = Math.round(position.y / gridSize) * gridSize;
  return { x, y };
}

function constrainDestinationToWorldBounds(position, width, height, gridSize) {
  const roundedPosition = roundToGrid(position, gridSize);
  const x = Math.min(
    width - gridSize / 2,
    Math.max(0 + gridSize / 2, roundedPosition.x)
  );
  const y = Math.min(
    height - gridSize / 2,
    Math.max(0 + gridSize / 2, roundedPosition.y)
  );
  return { x, y };
}

export default constrainDestinationToWorldBounds;
