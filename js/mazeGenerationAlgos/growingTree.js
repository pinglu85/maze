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

function growingTree(grid, option) {
  const activeCells = [];
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  const startCell = grid[randomRow][randomCol];
  activeCells.push(startCell);

  while (activeCells.length > 0) {
    const selectedCell = selectCellFromArr(activeCells, option);
    if (!selectedCell.isVisited) {
      selectedCell.isVisited = true;
    }

    const randomAvailNeighbor = selectedCell.getRandomAvailNeighbor(grid);
    if (!randomAvailNeighbor) {
      activeCells.pop();
      continue;
    }

    const [dir, neighbor] = randomAvailNeighbor;

    selectedCell.dropWall(dir);

    const oppositeDir = getOppositeDir(dir);
    neighbor.dropWall(oppositeDir);
    neighbor.isVisited = true;
    activeCells.push(neighbor);
  }
}

export default growingTree;
