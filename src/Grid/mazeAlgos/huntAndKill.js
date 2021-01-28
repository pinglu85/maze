import { delay, getRandomIndex, shuffleArrIndices } from '../../utils';

function walk(grid, cell, resolve) {
  cell.isStartingCell = false;
  cell.isVisited = true;

  const unvisitedNeighbor = cell.getRandomUnvisitedNeighbor(grid);
  if (!unvisitedNeighbor) {
    resolve();
    return;
  }

  const [dir, neighbor] = unvisitedNeighbor;
  cell.connectWithNeighbor(dir, neighbor);
  neighbor.isStartingCell = true;
  resolve(neighbor);
}

function asyncWalk(grid, cell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      walk(grid, cell, resolve);
    }, wait);
  });
}

async function hunt(grid, wait, resolve) {
  let visitedNeighbor;
  for (const rowIndex of shuffleArrIndices(grid.length)) {
    for (const colIndex of shuffleArrIndices(grid[rowIndex].length)) {
      const cell = grid[rowIndex][colIndex];
      cell.isScanned = true;
      await delay(wait);
      if (cell.isVisited) {
        continue;
      }

      visitedNeighbor = cell.getRandomVisitedNeighbor(grid);
      if (visitedNeighbor) {
        const [dir, neighbor] = visitedNeighbor;
        cell.connectWithNeighbor(dir, neighbor);
        cell.isVisited = true;
        cell.isStartingCell = true;

        grid[rowIndex].forEach((cell) => {
          cell.isScanned = false;
        });
        resolve(cell);
        return;
      }
    }
    grid[rowIndex].forEach((cell) => {
      cell.isScanned = false;
    });
  }

  if (!visitedNeighbor) {
    resolve();
  }
}

function asyncHunt(grid, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      hunt(grid, wait, resolve);
    }, wait);
  });
}

async function asyncHuntAndKill(grid, wait = 50) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  let startingCell = grid[randomRow][randomCol];
  startingCell.isStartingCell = true;

  while (startingCell) {
    let neighbor = await asyncWalk(grid, startingCell, wait);
    while (neighbor) {
      neighbor = await asyncWalk(grid, neighbor, wait);
    }
    startingCell = await asyncHunt(grid, wait);
  }

  return Promise.resolve();
}

export { walk };
export default asyncHuntAndKill;
