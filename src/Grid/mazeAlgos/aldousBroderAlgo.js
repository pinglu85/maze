import { getOppositeDir, getRandomIndex } from '../../utils';

function walk(grid, cell, resolve) {
  cell.isStartingCell = false;
  cell.isVisited = true;

  const [dir, neighbor] = cell.getRandomNeighbor(grid);
  neighbor.isStartingCell = true;

  if (neighbor.isVisited) {
    resolve(neighbor);
    return;
  }

  cell.dropWall(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropWall(oppositeDir);

  resolve(neighbor);
}

function asyncWalk(grid, cell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      walk(grid, cell, resolve);
    }, wait);
  });
}

async function asyncAldousBroderAlgo(grid, wait = 50) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  let startingCell = grid[randomRow][randomCol];
  startingCell.isStartingCell = true;

  const hasUnvisitedCell = () => {
    return grid.some((row) => row.some((col) => !col.isVisited));
  };

  while (hasUnvisitedCell()) {
    startingCell = await asyncWalk(grid, startingCell, wait);
  }

  startingCell.isStartingCell = false;
  return Promise.resolve();
}

export default asyncAldousBroderAlgo;
