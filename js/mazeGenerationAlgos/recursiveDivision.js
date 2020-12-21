import { delay, getRandomIndex } from '../utils/index.js';

async function asyncDivideHorizontally(
  grid,
  startRow,
  endRow,
  startCol,
  endCol,
  wait
) {
  let mid = 0;
  if (endRow - startRow > 2) {
    mid = getRandomIndex(endRow - startRow) + startRow;
  } else {
    mid = Math.floor((startRow + endRow) / 2);
  }
  const escapedCellColIndex = getRandomIndex(endCol - startCol + 1) + startCol;
  for (let i = startCol; i <= endCol; i++) {
    await delay(wait);
    if (i === escapedCellColIndex) {
      continue;
    }

    grid[mid][i].addWall('south');
    grid[mid + 1][i].addWall('north');
  }

  await delay(wait);
  await asyncDivide(grid, startRow, mid, startCol, endCol, wait);
  await delay(wait);
  await asyncDivide(grid, mid + 1, endRow, startCol, endCol, wait);
}

async function asyncDivideVertically(
  grid,
  startRow,
  endRow,
  startCol,
  endCol,
  wait
) {
  let mid = 0;
  if (endCol - startCol > 2) {
    mid = getRandomIndex(endCol - startCol) + startCol;
  } else {
    mid = Math.floor((startCol + endCol) / 2);
  }

  const escapedCellRowIndex = getRandomIndex(endRow - startRow + 1) + startRow;
  for (let i = startRow; i <= endRow; i++) {
    await delay(wait);
    if (i === escapedCellRowIndex) {
      continue;
    }

    grid[i][mid].addWall('west');
    grid[i][mid + 1].addWall('east');
  }

  await delay(wait);
  await asyncDivide(grid, startRow, endRow, startCol, mid, wait);
  await delay(wait);
  await asyncDivide(grid, startRow, endRow, mid + 1, endCol, wait);
}

async function asyncDivide(grid, startRow, endRow, startCol, endCol, wait) {
  if (startRow === endRow || startCol === endCol) {
    return;
  }

  if (endRow - startRow + 1 > endCol - startCol + 1) {
    await asyncDivideHorizontally(
      grid,
      startRow,
      endRow,
      startCol,
      endCol,
      wait
    );
  } else {
    await asyncDivideVertically(grid, startRow, endRow, startCol, endCol, wait);
  }
}

async function asyncRecursiveDivision(grid, wait = 50) {
  await asyncDivide(grid, 0, grid.length - 1, 0, grid[0].length - 1, wait);
  return Promise.resolve();
}

export default asyncRecursiveDivision;
