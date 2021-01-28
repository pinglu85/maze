import { getOppositeDir, getRandomIndex, swapItemsInArray } from '../../utils';

function selectCellFromArr(arr, option) {
  const lastIndex = arr.length - 1;

  if (option === 'random' || (option === 'mix' && getRandomIndex(2) === 1)) {
    const randomIndex = getRandomIndex(arr.length);
    if (randomIndex !== lastIndex) {
      swapItemsInArray(arr, randomIndex, lastIndex);
    }
  }

  return arr[lastIndex];
}

async function updateActiveCells(grid, startingCell, activeCells, resolve) {
  const randomAvailNeighbor = startingCell.getRandomUnvisitedNeighbor(grid);
  if (!randomAvailNeighbor) {
    activeCells.pop();
    resolve();
    return;
  }

  const [dir, neighbor] = randomAvailNeighbor;

  startingCell.dropWall(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropWall(oppositeDir);
  neighbor.isVisited = true;
  activeCells.push(neighbor);
  resolve();
}

function asyncUpdateActiveCells(grid, startingCell, activeCells, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      updateActiveCells(grid, startingCell, activeCells, resolve);
    }, wait);
  });
}

async function asyncGrowingTree(grid, option, wait = 50) {
  const activeCells = [];
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  let startingCell = grid[randomRow][randomCol];
  activeCells.push(startingCell);

  while (activeCells.length > 0) {
    startingCell = selectCellFromArr(activeCells, option);
    startingCell.isStartingCell = true;
    if (!startingCell.isVisited) {
      startingCell.isVisited = true;
    }
    await asyncUpdateActiveCells(grid, startingCell, activeCells, wait);
    startingCell.isStartingCell = false;
  }

  return Promise.resolve();
}

export default asyncGrowingTree;
