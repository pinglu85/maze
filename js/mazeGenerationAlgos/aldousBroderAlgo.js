import getRandomIndex from '../utils/getRandomIndex.js';
import getOppositeDir from '../utils/getOppositeDir.js';

function asyncWalk(grid, cell, wait) {
  const walk = (resolve) => {
    cell.isStartCell = false;
    cell.isVisited = true;

    const [dir, neighbor] = cell.getRandomNeighbor(grid);
    neighbor.isStartCell = true;

    if (neighbor.isVisited) {
      resolve(neighbor);
      return;
    }

    cell.dropEdge(dir);

    const oppositeDir = getOppositeDir(dir);
    neighbor.dropEdge(oppositeDir);

    resolve(neighbor);
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      walk(resolve);
    }, wait);
  });
}

async function asyncAldousBroderAlgo(grid, wait = 50) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  let startCell = grid[randomRow][randomCol];
  startCell.isStartCell = true;

  const hasUnvisitedCell = () => {
    return grid.some((row) => row.some((col) => !col.isVisited));
  };

  while (hasUnvisitedCell()) {
    startCell = await asyncWalk(grid, startCell, wait);
  }

  startCell.isStartCell = false;
  return false;
}

export default asyncAldousBroderAlgo;
