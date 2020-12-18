import getRandomIndex from '../utils/getRandomIndex.js';
import getOppositeDir from '../utils/getOppositeDir.js';
import swapItemsInArray from '../utils/swapItemsInArray.js';

function walk(prevCell, cell, grid) {
  if (prevCell) {
    prevCell.isStartCell = false;
    prevCell.isVisited = true;
  }
  cell.isStartCell = true;

  const northernAndEasternNeighbors = cell
    .getNeighbors(grid)
    .filter(
      (neighbor) =>
        neighbor[1] && (neighbor[0] === 'north' || neighbor[0] === 'east')
    );

  if (!northernAndEasternNeighbors.length) {
    return;
  }

  const randomIndex = getRandomIndex(northernAndEasternNeighbors.length);
  const [dir, neighbor] = northernAndEasternNeighbors[randomIndex];
  cell.dropEdge(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropEdge(oppositeDir);
}

function binaryTree(grid) {
  const flattenedGrid = [];

  for (const row of grid) {
    for (const col of row) {
      flattenedGrid.push(col);
    }
  }

  let prevStartCell, startCell;

  while (flattenedGrid.length > 0) {
    const randomIndex = getRandomIndex(flattenedGrid.length);
    swapItemsInArray(flattenedGrid, randomIndex, flattenedGrid.length - 1);
    startCell = flattenedGrid.pop();

    walk(prevStartCell, startCell, grid);

    prevStartCell = startCell;
  }

  startCell.isStartCell = false;
  startCell.isVisited = true;
  return false;
}

export default binaryTree;
