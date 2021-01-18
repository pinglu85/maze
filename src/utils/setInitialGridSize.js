import { checkDevice } from '.';
import { updateGridSize } from '../store/actions';
import {
  GRID_SIZE_MOBILE,
  GRID_SIZE_TABLET,
  GRID_SIZE_BIG_TABLET,
  GRID_SIZE_DESKTOP,
} from '../constants/localStorageKeys';

export default function setInitialGridSize(dispatch) {
  const device = checkDevice();
  let storedGridSize;

  if (device === 'mobile') {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_MOBILE));
    if (!storedGridSize) {
      setGridSize(dispatch, { numOfRows: 8, numOfCols: 9 });
      return;
    }

    setGridSize(dispatch, storedGridSize);
    return;
  }

  if (device === 'tablet') {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_TABLET));
    if (!storedGridSize) {
      setGridSize(dispatch, { numOfRows: 15, numOfCols: 20 });
      return;
    }

    setGridSize(dispatch, storedGridSize);
    return;
  }

  if (device === 'bigTablet') {
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
    setGridSize(dispatch, { numOfRows: 13, numOfCols: 40 });
    return;
  }

  setGridSize(dispatch, storedGridSize);
}

function setGridSize(dispatch, gridSize) {
  dispatch(updateGridSize(gridSize));
}
