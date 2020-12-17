import getRandomIndex from '../utils/getRandomIndex.js';
import getOppositeDir from '../utils/getOppositeDir.js';

function walk(grid, cell) {
  cell.isStartCell = false;
  cell.isVisited = true;

  const [dir, neighbor] = cell.getRandomNeighbor(grid);
  neighbor.isStartCell = true;

  if (neighbor.isVisited) {
    return neighbor;
  }

  cell.dropEdge(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropEdge(oppositeDir);

  return neighbor;
}

function aldousBroderAlgo(grid) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  let startCell = grid[randomRow][randomCol];
  startCell.isStartCell = true;

  const hasUnvisitedCell = () => {
    return grid.some((row) => row.some((col) => !col.isVisited));
  };

  while (hasUnvisitedCell()) {
    startCell = walk(grid, startCell);
  }

  startCell.isStartCell = false;
  return false;
}

export default aldousBroderAlgo;
