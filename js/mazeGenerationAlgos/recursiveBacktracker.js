import { delay, getOppositeDir, getRandomIndex } from '../utils/index.js';

function getNeighbor(grid, lastCell, resolve) {
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
}

function asyncGetNeighbor(grid, lastCell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getNeighbor(grid, lastCell, resolve);
    }, wait);
  });
}

async function asyncWalk(grid, stack, wait) {
  let startCell = stack[stack.length - 1];
  while (startCell) {
    startCell = await asyncGetNeighbor(grid, startCell, wait);
    if (startCell) {
      stack.push(startCell);
    }
  }
  return Promise.resolve();
}

async function backtracking(grid, stack, wait, resolve) {
  while (stack.length > 0) {
    const lastCell = stack[stack.length - 1];
    lastCell.isScanning = true;

    await delay(wait);

    const randomAvailNeighbor = lastCell.getRandomAvailNeighbor(grid);
    lastCell.isScanning = false;

    if (!randomAvailNeighbor) {
      stack.pop();
      continue;
    }

    const [dir, neighbor] = randomAvailNeighbor;

    lastCell.dropWall(dir);

    const oppositeDir = getOppositeDir(dir);
    neighbor.dropWall(oppositeDir);
    neighbor.isStartCell = true;

    stack.push(neighbor);
    resolve();
    return;
  }

  resolve();
}

function asyncBacktracking(grid, stack, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      backtracking(grid, stack, wait, resolve);
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
    await asyncWalk(grid, stack, wait);
    await asyncBacktracking(grid, stack, wait);
  }

  return Promise.resolve();
}

export default asyncRecursiveBacktracker;
