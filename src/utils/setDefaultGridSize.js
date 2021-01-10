import { checkIsMobile, checkIsTablet, checkIsBigTablet } from '.';
import { updateGridSize } from '../store/actions';
import {
  GRID_SIZE_MOBILE,
  GRID_SIZE_TABLET,
  GRID_SIZE_BIG_TABLET,
  GRID_SIZE_DESKTOP,
} from '../constants/localStorageKeys';

export default function setDefaultGridSize(dispatch) {
  let storedGridSize;

  if (checkIsMobile()) {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_MOBILE));
    if (!storedGridSize) {
      setGridSize(dispatch, { numOfRows: 8, numOfCols: 9 });
      return;
    }

    setGridSize(storedGridSize);
    return;
  }

  if (checkIsTablet()) {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_TABLET));
    if (!storedGridSize) {
      setGridSize(dispatch, { numOfRows: 15, numOfCols: 20 });
      return;
    }

    setGridSize(dispatch, storedGridSize);
    return;
  }

  if (checkIsBigTablet()) {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_BIG_TABLET));
    if (!storedGridSize) {
      setGridSize(dispatch, { numOfRows: 15, numOfCols: 30 });
      return;
    }

    setGridSize(dispatch, storedGridSize);
    return;
  }

  storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_DESKTOP));
  if (!storedGridSize) {
    setGridSize(dispatch, { numOfRows: 12, numOfCols: 40 });
    return;
  }

  setGridSize(dispatch, storedGridSize);
}

function setGridSize(dispatch, gridSize) {
  dispatch(updateGridSize(gridSize));
}
