import { checkDevice } from '.';
import { updateGridSize } from '../store/actions';
import {
  GRID_SIZE_MOBILE,
  GRID_SIZE_TABLET,
  GRID_SIZE_BIG_TABLET,
  GRID_SIZE_DESKTOP,
} from '../constants/localStorageKeys';
import { DEFAULT_GRID_SIZE } from '../constants/size';

export default function setInitialGridSize(dispatch) {
  const device = checkDevice();
  let storedGridSize;

  if (device === 'mobile') {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_MOBILE));
    if (!storedGridSize) {
      setGridSize(dispatch, DEFAULT_GRID_SIZE.mobile);
      return;
    }

    setGridSize(dispatch, storedGridSize);
    return;
  }

  if (device === 'tablet') {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_TABLET));
    if (!storedGridSize) {
      setGridSize(dispatch, DEFAULT_GRID_SIZE.tablet);
      return;
    }

    setGridSize(dispatch, storedGridSize);
    return;
  }

  if (device === 'bigTablet') {
    storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_BIG_TABLET));
    if (!storedGridSize) {
      setGridSize(dispatch, DEFAULT_GRID_SIZE.bigTablet);
      return;
    }

    setGridSize(dispatch, storedGridSize);
    return;
  }

  storedGridSize = JSON.parse(localStorage.getItem(GRID_SIZE_DESKTOP));
  if (!storedGridSize) {
    setGridSize(dispatch, DEFAULT_GRID_SIZE.desktop);
    return;
  }

  setGridSize(dispatch, storedGridSize);
}

function setGridSize(dispatch, gridSize) {
  dispatch(updateGridSize(gridSize));
}
