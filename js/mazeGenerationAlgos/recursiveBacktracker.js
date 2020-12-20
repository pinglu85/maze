import { delay, getOppositeDir, getRandomIndex } from '../utils/index.js';

function asyncGetNeighbor(grid, lastCell, wait) {
  const getNeighbor = (resolve) => {
    lastCell.isStartCell = false;
    lastCell.isVisited = true;

    const randomAvailNeighbor = lastCell.getRandomAvailNeighbor(grid);
    if (!randomAvailNeighbor) {
      resolve();
      return;
    }

    const [dir, neighbor] = randomAvailNeighbor;

    lastCell.dropWall(dir);

    const oppositeDir = getOppositeDir(dir);
    neighbor.dropWall(oppositeDir);
    neighbor.isStartCell = true;

    resolve(neighbor);
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      getNeighbor(resolve);
    }, wait);
  });
}

async function asyncWalk(grid, stack, wait) {
  const newStack = [...stack];
  let startCell = newStack[newStack.length - 1];
  while (startCell) {
    startCell = await asyncGetNeighbor(grid, startCell, wait);
    if (startCell) {
      newStack.push(startCell);
    }
  }
  return Promise.resolve(newStack);
}

function asyncBacktracking(grid, stack, wait) {
  const backtracking = async (resolve) => {
    const newStack = [...stack];
    while (newStack.length) {
      const lastCell = newStack[newStack.length - 1];
      lastCell.isScanning = true;

      await delay(wait);

      const randomAvailNeighbor = lastCell.getRandomAvailNeighbor(grid);
      lastCell.isScanning = false;

      if (!randomAvailNeighbor) {
        newStack.pop();
        continue;
      }

      const [dir, neighbor] = randomAvailNeighbor;

      lastCell.dropWall(dir);

      const oppositeDir = getOppositeDir(dir);
      neighbor.dropWall(oppositeDir);
      neighbor.isStartCell = true;

      newStack.push(neighbor);
      resolve(newStack);
      return;
    }

    resolve([]);
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      backtracking(resolve);
    }, wait);
  });
}

async function asyncRecursiveBacktracker(grid, wait = 50) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  const startCell = grid[randomRow][randomCol];
  startCell.isStartCell = true;

  let stack = [startCell];

  while (stack.length) {
    stack = await asyncWalk(grid, stack, wait);
    stack = await asyncBacktracking(grid, stack, wait);
  }

  return Promise.resolve();
}

export default asyncRecursiveBacktracker;
