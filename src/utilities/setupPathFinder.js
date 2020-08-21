import PathFinder from "easystarjs";

const WALKABLE_TILE = 0;
const UNWALKABLE_TILE = 1;

function tileHasCollision(tile) {
  return tile.properties.collision;
}

function setupPathFinder(scene) {
  const map = scene.registry.get("map");
  const pathFinder = new PathFinder.js();
  const grid = Array(map.height).fill([]);
  const acceptableTiles = [WALKABLE_TILE];

  pathFinder.enableDiagonals();
  map.forEachTile(({ x, y }) => {
    const tile = map.getTileAt(x, y);
    grid[y][x] = tileHasCollision(tile) ? UNWALKABLE_TILE : WALKABLE_TILE;
  });
  pathFinder.setGrid(grid);
  pathFinder.setAcceptableTiles(acceptableTiles);

  return pathFinder;
}

export default setupPathFinder;
