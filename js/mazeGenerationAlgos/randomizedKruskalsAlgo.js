import { delay, getOppositeDir, shuffleArr } from '../utils/index.js';

async function asyncMerge(cellPairs, cellSets, wait) {
  const [cell, [dir, neighbor]] = cellPairs.pop();
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

  const currCellSetId = cell.cellSetId;
  const cellSet = cellSets.get(currCellSetId);
  const neighborSetId = neighbor.cellSetId;
  const neighborSet = cellSets.get(neighbor.cellSetId);

  neighborSet.forEach((c) => {
    c.cellSetId = currCellSetId;
    cellSet.push(c);
  });

  cellSets.delete(neighborSetId);

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
  let cellPairs = [];

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

  cellPairs = shuffleArr(cellPairs);

  while (cellSets.size > 1) {
    await asyncMerge(cellPairs, cellSets, wait);
  }

  return Promise.resolve();
}

export default randomizedKruskalsAlgo;
