import getRandomIndex from '../utils/getRandomIndex.js';
import getOppositeDir from '../utils/getOppositeDir.js';
import swapItemsInArray from '../utils/swapItemsInArray.js';
import delay from '../utils/delay.js';

function asyncWalk(prevCell, cell, grid, wait) {
  const walk = () => {
    if (prevCell) {
      prevCell.isStartCell = false;
      prevCell.isVisited = true;
    }
    cell.isStartCell = true;

    const northernAndEasternNeighbors = cell
      .getNeighbors(grid)
      .filter(
        (neighbor) =>
          neighbor[1] && (neighbor[0] === 'north' || neighbor[0] === 'west')
      );

    if (!northernAndEasternNeighbors.length) {
      return;
    }

    const randomIndex = getRandomIndex(northernAndEasternNeighbors.length);
    const [dir, neighbor] = northernAndEasternNeighbors[randomIndex];

    cell.dropWall(dir);

    const oppositeDir = getOppositeDir(dir);
    neighbor.dropWall(oppositeDir);
    neighbor.isConnected = true;
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      walk();
      resolve();
    }, wait);
  });
}

async function asyncBinaryTree(grid, wait = 50) {
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

    await asyncWalk(prevStartCell, startCell, grid, wait);

    prevStartCell = startCell;

    await delay(wait * 3);
  }

  startCell.isStartCell = false;
  startCell.isVisited = true;
  return false;
}

export default asyncBinaryTree;
