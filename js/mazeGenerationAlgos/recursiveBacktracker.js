import getRandomIndex from '../utils/getRandomIndex.js';
import getOppositeDir from '../utils/getOppositeDir.js';

function walk(grid, stack) {
  console.log(stack);
  const lastCell = stack[stack.length - 1];
  lastCell.isStartCell = false;
  lastCell.isVisited = true;

  const randomAvailNeighbor = lastCell.getRandomAvailNeighbor(grid);
  if (!randomAvailNeighbor) {
    return stack;
  }

  const [dir, neighbor] = randomAvailNeighbor;
  const oppositeDir = getOppositeDir(dir);
  lastCell.dropEdge(dir);
  neighbor.isStartCell = true;
  neighbor.dropEdge(oppositeDir);

  const newStack = stack.concat(neighbor);
  return walk(grid, newStack);
}

function backtracking(grid, stack) {
  const newStack = [...stack];
  while (newStack.length) {
    const lastCell = newStack[newStack.length - 1];
    const randomAvailNeighbor = lastCell.getRandomAvailNeighbor(grid);
    if (!randomAvailNeighbor) {
      newStack.pop();
      continue;
    }

    const [dir, neighbor] = randomAvailNeighbor;
    const oppositeDir = getOppositeDir(dir);
    lastCell.dropEdge(dir);
    neighbor.isStartCell = true;
    neighbor.dropEdge(oppositeDir);
    return newStack.concat(neighbor);
  }

  return [];
}

function recursiveBacktracker(grid) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  const startCell = grid[randomRow][randomCol];
  startCell.isStartCell = true;

  let stack = [startCell];

  while (stack.length) {
    stack = walk(grid, stack);
    stack = backtracking(grid, stack);
  }

  return false;
}

export default recursiveBacktracker;
