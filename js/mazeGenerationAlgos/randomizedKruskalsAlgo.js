import { delay, getOppositeDir, getRandomIndex } from '../utils/index.js';

async function asyncMerge(grid, cellSets, wait) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  const cell = grid[randomRow][randomCol];
  cell.isStartCell = true;
  if (!cell.isVisited) {
    cell.isVisited = true;
  }
  const [dir, neighbor] = cell.getRandomNeighbor(grid);

  neighbor.isNeighbor = true;

  await delay(wait * 3);

  if (cell.cellSetId === neighbor.cellSetId) {
    cell.isStartCell = false;
    neighbor.isNeighbor = false;
    return;
  }

  const cellSetId = cell.cellSetId;
  const cellSet = cellSets.get(cellSetId);
  const neighborSetId = neighbor.cellSetId;
  const neighborSet = cellSets.get(neighborSetId);

  neighborSet.forEach((c) => {
    c.cellSetId = cellSetId;
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

  for (const row of grid) {
    for (const col of row) {
      col.cellSetId = `row${col.rowIndex}col${col.colIndex}`;
      cellSets.set(col.cellSetId, [col]);
    }
  }

  while (cellSets.size > 1) {
    await asyncMerge(grid, cellSets, wait);
  }

  return Promise.resolve();
}

export default randomizedKruskalsAlgo;
