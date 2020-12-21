import { delay, getOppositeDir, getRandomIndex } from '../utils/index.js';

async function asyncMerge(cellPairs, cellSets, wait) {
  const randomIndex = getRandomIndex(cellPairs.length);
  const [cell, [dir, neighbor]] = cellPairs.splice(randomIndex, 1)[0];
  cell.isStartCell = true;
  if (!cell.isVisited) {
    cell.isVisited = true;
  }

  neighbor.isNeighbor = true;

  await delay(wait * 3);

  if (cell.cellSetId === neighbor.cellSetId) {
    cell.isStartCell = false;
    neighbor.isNeighbor = false;
    return;
  }

  const cellSet = cellSets.get(cell.cellSetId);
  const neighborSet = cellSets.get(neighbor.cellSetId);

  neighborSet.forEach((c) => {
    c.cellSetId = cell.cellSetId;
    cellSet.push(c);
  });

  cell.dropWall(dir);

  const oppositeDir = getOppositeDir(dir);
  neighbor.dropWall(oppositeDir);
  neighbor.isVisited = true;

  return new Promise((resolve) => {
    setTimeout(() => {
      cell.isStartCell = false;
      neighbor.isNeighbor = false;
      resolve();
    }, wait);
  });
}

async function randomizedKruskalsAlgo(grid, wait = 50) {
  const cellSets = new Map();
  const cellPairs = [];

  for (const row of grid) {
    for (const col of row) {
      col.cellSetId = `row${col.rowIndex}col${col.colIndex}`;
      cellSets.set(col.cellSetId, [col]);

      col
        .getNeighbors(grid)
        .filter((neighbor) => neighbor[1])
        .forEach((neighbor) => {
          cellPairs.push([col, neighbor]);
        });
    }
  }

  while (cellPairs.length > 0) {
    await asyncMerge(cellPairs, cellSets, wait);
  }

  return Promise.resolve();
}

export default randomizedKruskalsAlgo;
