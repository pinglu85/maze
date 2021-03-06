import { delay, getRandomIndex } from '../../utils';
import { walk } from './huntAndKill';

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

function asyncGetNewStartCell(grid, prevStartCell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      walk(grid, prevStartCell, resolve);
    }, wait);
  });
}

async function asyncBacktracking(grid, stack, wait) {
  while (stack.length > 0) {
    const visitedCell = stack[stack.length - 1];
    visitedCell.isScanned = true;

    await delay(wait);

    const unvisitedNeighbor = visitedCell.getRandomNeighbor(grid, 'unvisited');
    visitedCell.isScanned = false;

    if (!unvisitedNeighbor) {
      stack.pop();
      continue;
    }

    const [dir, neighbor] = unvisitedNeighbor;
    visitedCell.connectWithNeighbor(dir, neighbor);
    neighbor.isStartingCell = true;
    stack.push(neighbor);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, wait);
    });
  }

  return Promise.resolve();
}

export default asyncRecursiveBacktracker;
