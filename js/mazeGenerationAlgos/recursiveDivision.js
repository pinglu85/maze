import getRandomIndex from '../utils/getRandomIndex.js';

function _recursiveDivision(grid, startRow, endRow, startCol, endCol) {
  if (startRow === endRow || startCol === endCol) {
    return;
  }

  let mid, isHorizontalDivision;
  if (endRow - startRow + 1 > endCol - startCol + 1) {
    isHorizontalDivision = true;
  } else {
    isHorizontalDivision = false;
  }

  if (isHorizontalDivision) {
    mid = Math.floor((startRow + endRow) / 2);
    const escapedCellColIndex =
      getRandomIndex(endCol - startCol + 1) + startCol;
    for (let i = startCol; i <= endCol; i++) {
      if (i === escapedCellColIndex) {
        continue;
      }

      grid[mid][i].addEdges('south');
      grid[mid + 1][i].addEdges('north');
    }

    _recursiveDivision(grid, startRow, mid, startCol, endCol);
    _recursiveDivision(grid, mid + 1, endRow, startCol, endCol);
  } else {
    mid = Math.floor((startCol + endCol) / 2);
    const escapedCellRowIndex =
      getRandomIndex(endRow - startRow + 1) + startRow;
    for (let i = startRow; i <= endRow; i++) {
      if (i === escapedCellRowIndex) {
        continue;
      }

      grid[i][mid].addEdges('west');
      grid[i][mid + 1].addEdges('east');
    }

    _recursiveDivision(grid, startRow, endRow, startCol, mid);
    _recursiveDivision(grid, startRow, endRow, mid + 1, endCol);
  }
}

function recursiveDivision(grid) {
  _recursiveDivision(grid, 0, grid.length - 1, 0, grid[0].length - 1);
  return false;
}

export default recursiveDivision;
