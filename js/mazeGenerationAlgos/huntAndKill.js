import getRandomIndex from '../utils/getRandomIndex.js';
import shuffleArray from '../utils/shuffleArray.js';

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
        cell.dropEdge(dir);
        neighbor.isStartCell = true;
        neighbor.dropOppositeEdge(dir);
        resolve(neighbor);
      }
    }, wait);
  });
}

function asyncHunt(grid, wait) {
  return new Promise((resolve) => {
    const hunt = async () => {
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
            cell.isVisited = true;
            cell.isStartCell = true;
            cell.dropEdge(dir);
            neighbor.dropOppositeEdge(dir);
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

    setTimeout(hunt, wait);
  });
}

function asyncHuntAndKill(grid, wait = 50) {
  return new Promise(async (resolve) => {
    const randomRow = getRandomIndex(grid.length);
    const randomColumn = getRandomIndex(grid[0].length);
    let startCell = grid[randomRow][randomColumn];
    startCell.isStartCell = true;

    const allCellsIsVisited = grid.every((row) =>
      row.every((col) => col.isVisited)
    );

    while (!allCellsIsVisited && startCell) {
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
