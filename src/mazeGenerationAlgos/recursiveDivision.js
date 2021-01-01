import { delay, getRandomIndex } from '../utils';

function computeMid(start, end) {
  if (end - start >= 2) {
    return getRandomIndex(end - start) + start;
  }
  return Math.floor((start + end) / 2);
}

async function asyncDivideHorizontally(
  grid,
  startRow,
  endRow,
  startCol,
  endCol,
  wait
) {
  const mid = computeMid(startRow, endRow);

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
  const mid = computeMid(startCol, endCol);

  const escapedCellRowIndex = getRandomIndex(endRow - startRow + 1) + startRow;
  for (let i = startRow; i <= endRow; i++) {
    await delay(wait);
    if (i === escapedCellRowIndex) {
      continue;
    }

    grid[i][mid].addWall('east');
    grid[i][mid + 1].addWall('west');
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
