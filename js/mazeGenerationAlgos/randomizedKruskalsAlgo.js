import { getOppositeDir, getRandomIndex } from '../utils/index.js';

function merge(grid, cellSets) {
  const randomRow = getRandomIndex(grid.length);
  const randomCol = getRandomIndex(grid[0].length);
  const cell = grid[randomRow][randomCol];
  if (!cell.isVisited) {
    cell.isVisited = true;
  }
  const [dir, neighbor] = cell.getRandomNeighbor(grid);

  if (cell.cellSetId === neighbor.cellSetId) {
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
}

function randomizedKruskalsAlgo(grid) {
  const cellSets = new Map();

  for (const row of grid) {
    for (const col of row) {
      col.cellSetId = `row${col.rowIndex}col${col.colIndex}`;
      cellSets.set(col.cellSetId, [col]);
    }
  }

  while (cellSets.size > 1) {
    merge(grid, cellSets);
  }
}

export default randomizedKruskalsAlgo;
