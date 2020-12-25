import {
  getOppositeDir,
  getRandomIndex,
  swapItemsInArray,
} from '../utils/index.js';

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

async function updateActiveCells(grid, selectedCell, activeCells, resolve) {
  const randomAvailNeighbor = selectedCell.getRandomAvailNeighbor(grid);
  if (!randomAvailNeighbor) {
    activeCells.pop();
    resolve();
    return;
  }

  const [dir, neighbor] = randomAvailNeighbor;

  selectedCell.dropWall(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropWall(oppositeDir);
  neighbor.isVisited = true;
  activeCells.push(neighbor);
  resolve();
}

function asyncUpdateActiveCells(grid, selectedCell, activeCells, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      updateActiveCells(grid, selectedCell, activeCells, resolve);
    }, wait);
  });
}

async function asyncGrowingTree(grid, option, wait = 50) {
  const activeCells = [];
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  const startCell = grid[randomRow][randomCol];
  activeCells.push(startCell);

  while (activeCells.length > 0) {
    const selectedCell = selectCellFromArr(activeCells, option);
    selectedCell.isStartCell = true;
    if (!selectedCell.isVisited) {
      selectedCell.isVisited = true;
    }
    await asyncUpdateActiveCells(grid, selectedCell, activeCells, wait);
    selectedCell.isStartCell = false;
  }

  return Promise.resolve();
}

export default asyncGrowingTree;
