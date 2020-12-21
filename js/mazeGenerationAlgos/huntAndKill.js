import {
  delay,
  getOppositeDir,
  getRandomIndex,
  shuffleArrIndices,
} from '../utils/index.js';

function asyncWalk(grid, cell, wait) {
  const walk = (resolve) => {
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
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      walk(resolve);
    }, wait);
  });
}

function asyncHunt(grid, wait) {
  const hunt = async (resolve) => {
    let randomVisitedNeighbor;
    for (const i of shuffleArrIndices(grid.length)) {
      for (const j of shuffleArrIndices(grid[i].length)) {
        const cell = grid[i][j];
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

          grid[i].forEach((cell) => {
            cell.isScanning = false;
          });
          resolve(cell);
          return;
        }
      }
      grid[i].forEach((cell) => {
        cell.isScanning = false;
      });
    }

    if (!randomVisitedNeighbor) {
      resolve();
    }
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      hunt(resolve);
    }, wait);
  });
}

async function asyncHuntAndKill(grid, wait = 50) {
  const randomRow = getRandomIndex(grid.length);
  const randomColumn = getRandomIndex(grid[0].length);
  let startCell = grid[randomRow][randomColumn];
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
