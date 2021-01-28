import { delay, getRandomIndex, swapItemsInArray } from '../../utils';

function walk(prevCell, cell, grid, resolve) {
  if (prevCell) {
    prevCell.isStartingCell = false;
    prevCell.isVisited = true;
  }
  cell.isStartingCell = true;

  const northOrEastNeighbor = cell.getRandomNeighbor(grid, 'northAndEast');

  if (!northOrEastNeighbor) {
    resolve();
    return;
  }

  const [dir, neighbor] = northOrEastNeighbor;
  cell.connectWithNeighbor(dir, neighbor);
  neighbor.isConnected = true;
  resolve();
}

function asyncWalk(prevCell, cell, grid, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      walk(prevCell, cell, grid, resolve);
    }, wait);
  });
}

async function asyncBinaryTree(grid, wait = 50) {
  const flattenedGrid = [];

  for (const row of grid) {
    for (const cell of row) {
      flattenedGrid.push(cell);
    }
  }

  let prevStartingCell, startingCell;

  while (flattenedGrid.length > 0) {
    const randomIndex = getRandomIndex(flattenedGrid.length);
    swapItemsInArray(flattenedGrid, randomIndex, flattenedGrid.length - 1);
    startingCell = flattenedGrid.pop();

    await asyncWalk(prevStartingCell, startingCell, grid, wait);

    prevStartingCell = startingCell;

    await delay(wait * 3);
  }

  startingCell.isStartingCell = false;
  startingCell.isVisited = true;
  return Promise.resolve();
}

export default asyncBinaryTree;
