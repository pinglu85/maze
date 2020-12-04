import getRandomIndex from '../utils/getRandomIndex.js';
import shuffleArray from '../utils/shuffleArray.js';
import getOppositeDir from '../utils/getOppositeDir.js';

function delay(wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
}

function asyncWalk(grid, cell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      cell.isStartCell = false;
      cell.isVisited = true;
      const randomAvailNeighbor = cell.getRandomAvailNeighbor(grid);
      if (!randomAvailNeighbor) {
        resolve();
      } else {
        const [dir, neighbor] = randomAvailNeighbor;
        const oppositeDir = getOppositeDir(dir);
        cell.dropEdge(dir);
        neighbor.isStartCell = true;
        neighbor.dropEdge(oppositeDir);
        resolve(neighbor);
      }
    }, wait);
  });
}

function asyncHunt(grid, wait) {
  const hunt = async (resolve) => {
    let randomVisitedNeighbor;
    for (const i of shuffleArray(grid.length)) {
      for (const j of shuffleArray(grid[i].length)) {
        const cell = grid[i][j];
        cell.isScanning = true;
        await delay(wait);
        if (cell.isVisited) {
          continue;
        }

        randomVisitedNeighbor = cell.getRandomVisitedNeighbor(grid);
        if (randomVisitedNeighbor) {
          const [dir, neighbor] = randomVisitedNeighbor;
          const oppositeDir = getOppositeDir(dir);
          cell.isVisited = true;
          cell.isStartCell = true;
          cell.dropEdge(dir);
          neighbor.dropEdge(oppositeDir);
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
    setTimeout(hunt.bind(this, resolve), wait);
  });
}

function asyncHuntAndKill(grid, wait = 50) {
  return new Promise(async (resolve) => {
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

    resolve(false);
  });
}

export default asyncHuntAndKill;
