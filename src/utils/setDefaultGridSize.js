import { checkIsMobile, checkIsTablet, checkIsBigTablet } from '.';
import {
  GRID_SIZE_MOBILE,
  GRID_SIZE_TABLET,
  GRID_SIZE_BIG_TABLET,
  GRID_SIZE_DESKTOP,
} from '../constants/localStorageKeys';

export default function setDefaultGridSize(gridSize) {
  let storedGridSize;

  if (checkIsMobile()) {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_MOBILE));
    if (!storedGridSize) {
      setGridSize(gridSize, { numOfRows: 8, numOfCols: 9 });
      return;
    }

    setGridSize(gridSize, storedGridSize);
    return;
  }

  if (checkIsTablet()) {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_TABLET));
    if (!storedGridSize) {
      setGridSize(gridSize, { numOfRows: 15, numOfCols: 20 });
      return;
    }

    setGridSize(gridSize, storedGridSize);
    return;
  }

  if (checkIsBigTablet()) {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_BIG_TABLET));
    if (!storedGridSize) {
      setGridSize(gridSize, { numOfRows: 15, numOfCols: 30 });
      return;
    }

    setGridSize(gridSize, storedGridSize);
    return;
  }

  storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_DESKTOP));
  if (!storedGridSize) {
    setGridSize(gridSize, { numOfRows: 14, numOfCols: 40 });
    return;
  }

  setGridSize(gridSize, storedGridSize);
}

function setGridSize(gridSize, { numOfRows, numOfCols }) {
  gridSize.numOfRows = numOfRows;
  gridSize.numOfCols = numOfCols;
}
