import { getRandomIndex } from '../utils/index.js';

function divideHorizontally(grid, startRow, endRow, startCol, endCol) {
  const mid = Math.floor((startRow + endRow) / 2);
  const escapedCellColIndex = getRandomIndex(endCol - startCol + 1) + startCol;
  for (let i = startCol; i <= endCol; i++) {
    if (i === escapedCellColIndex) {
      continue;
    }

    grid[mid][i].addWall('south');
    grid[mid + 1][i].addWall('north');
  }

  divide(grid, startRow, mid, startCol, endCol);
  divide(grid, mid + 1, endRow, startCol, endCol);
}

function divideVertically(grid, startRow, endRow, startCol, endCol) {
  const mid = Math.floor((startCol + endCol) / 2);
  const escapedCellRowIndex = getRandomIndex(endRow - startRow + 1) + startRow;
  for (let i = startRow; i <= endRow; i++) {
    if (i === escapedCellRowIndex) {
      continue;
    }

    grid[i][mid].addWall('west');
    grid[i][mid + 1].addWall('east');
  }

  divide(grid, startRow, endRow, startCol, mid);
  divide(grid, startRow, endRow, mid + 1, endCol);
}

function divide(grid, startRow, endRow, startCol, endCol) {
  if (startRow === endRow || startCol === endCol) {
    return;
  }

  if (endRow - startRow + 1 > endCol - startCol + 1) {
    divideHorizontally(grid, startRow, endRow, startCol, endCol);
  } else {
    divideVertically(grid, startRow, endRow, startCol, endCol);
  }
}

function recursiveDivision(grid) {
  divide(grid, 0, grid.length - 1, 0, grid[0].length - 1);
  return false;
}

export default recursiveDivision;
