import { delay, getOppositeDir, shuffleArr } from '../../utils';

async function merge(cell, dir, neighbor, cellSets, resolve) {
  if (cell.cellSetId === neighbor.cellSetId) {
    neighbor.isInSameSet = true;
    resolve();
    return;
  }

  neighbor.isInDifferentSet = true;

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
  resolve();
}

function asyncMerge(cell, dir, neighbor, cellSets, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      merge(cell, dir, neighbor, cellSets, resolve);
    }, wait);
  });
}

async function asyncRandomizedKruskalsAlgo(grid, wait = 50) {
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
    const [cell, [dir, neighbor]] = cellPairs.pop();
    cell.isStartCell = true;
    if (!cell.isVisited) {
      cell.isVisited = true;
    }

    neighbor.isNeighbor = true;
    await asyncMerge(cell, dir, neighbor, cellSets, wait);

    await delay(wait);

    cell.isStartCell = false;
    neighbor.isNeighbor = false;
    neighbor.isInSameSet = false;
    neighbor.isInDifferentSet = false;
  }

  return Promise.resolve();
}

export default asyncRandomizedKruskalsAlgo;