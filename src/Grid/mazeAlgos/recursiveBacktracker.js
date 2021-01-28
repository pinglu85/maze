import { delay, getOppositeDir, getRandomIndex } from '../../utils';
import { walk } from './huntAndKill';

function asyncGetNewStartCell(grid, prevStartCell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      walk(grid, prevStartCell, resolve);
    }, wait);
  });
}

async function asyncWalk(grid, stack, wait) {
  let startingCell = stack[stack.length - 1];
  while (startingCell) {
    startingCell = await asyncGetNewStartCell(grid, startingCell, wait);
    if (startingCell) {
      stack.push(startingCell);
    }
  }
  return Promise.resolve();
}

async function backtracking(grid, stack, wait, resolve) {
  while (stack.length > 0) {
    const prevStartCell = stack[stack.length - 1];
    prevStartCell.isScanned = true;

    await delay(wait);

    const randomAvailNeighbor = prevStartCell.getRandomUnvisitedNeighbor(grid);
    prevStartCell.isScanned = false;

    if (!randomAvailNeighbor) {
      stack.pop();
      continue;
    }

    const [dir, neighbor] = randomAvailNeighbor;

    prevStartCell.dropWall(dir);

    const oppositeDir = getOppositeDir(dir);
    neighbor.dropWall(oppositeDir);
    neighbor.isStartingCell = true;

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
  const startingCell = grid[randomRow][randomCol];
  startingCell.isStartingCell = true;

  let stack = [startingCell];

  while (stack.length) {
    await asyncWalk(grid, stack, wait);
    await asyncBacktracking(grid, stack, wait);
  }

  return Promise.resolve();
}

export default asyncRecursiveBacktracker;
