import { getOppositeDir, getRandomIndex, swapItemsInArray } from '../utils';

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

async function updateActiveCells(grid, startCell, activeCells, resolve) {
  const randomAvailNeighbor = startCell.getRandomAvailNeighbor(grid);
  if (!randomAvailNeighbor) {
    activeCells.pop();
    resolve();
    return;
  }

  const [dir, neighbor] = randomAvailNeighbor;

  startCell.dropWall(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropWall(oppositeDir);
  neighbor.isVisited = true;
  activeCells.push(neighbor);
  resolve();
}

function asyncUpdateActiveCells(grid, startCell, activeCells, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      updateActiveCells(grid, startCell, activeCells, resolve);
    }, wait);
  });
}

async function asyncGrowingTree(grid, option, wait = 50) {
  const activeCells = [];
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  let startCell = grid[randomRow][randomCol];
  activeCells.push(startCell);

  while (activeCells.length > 0) {
    startCell = selectCellFromArr(activeCells, option);
    startCell.isStartCell = true;
    if (!startCell.isVisited) {
      startCell.isVisited = true;
    }
    await asyncUpdateActiveCells(grid, startCell, activeCells, wait);
    startCell.isStartCell = false;
  }

  return Promise.resolve();
}

export default asyncGrowingTree;
