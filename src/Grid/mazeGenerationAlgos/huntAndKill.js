import {
  delay,
  getOppositeDir,
  getRandomIndex,
  shuffleArrIndices,
} from '../../utils';

function walk(grid, cell, resolve) {
  cell.isStartCell = false;
  cell.isVisited = true;

  const randomAvailNeighbor = cell.getRandomAvailNeighbor(grid);
  if (!randomAvailNeighbor) {
    resolve();
    return;
  }

  const [dir, neighbor] = randomAvailNeighbor;

  cell.dropWall(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropWall(oppositeDir);
  neighbor.isStartCell = true;

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
  let randomVisitedNeighbor;
  for (const rowIndex of shuffleArrIndices(grid.length)) {
    for (const colIndex of shuffleArrIndices(grid[rowIndex].length)) {
      const cell = grid[rowIndex][colIndex];
      cell.isScanning = true;
      await delay(wait);
      if (cell.isVisited) {
        continue;
      }

      randomVisitedNeighbor = cell.getRandomVisitedNeighbor(grid);
      if (randomVisitedNeighbor) {
        const [dir, neighbor] = randomVisitedNeighbor;

        cell.dropWall(dir);
        cell.isVisited = true;
        cell.isStartCell = true;

        const oppositeDir = getOppositeDir(dir);
        neighbor.dropWall(oppositeDir);

        grid[rowIndex].forEach((cell) => {
          cell.isScanning = false;
        });
        resolve(cell);
        return;
      }
    }
    grid[rowIndex].forEach((cell) => {
      cell.isScanning = false;
    });
  }

  if (!randomVisitedNeighbor) {
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
  let startCell = grid[randomRow][randomCol];
  startCell.isStartCell = true;

  while (startCell) {
    let neighbor = await asyncWalk(grid, startCell, wait);
    while (neighbor) {
      neighbor = await asyncWalk(grid, neighbor, wait);
    }
    startCell = await asyncHunt(grid, wait);
  }

  return Promise.resolve();
}

export default asyncHuntAndKill;
