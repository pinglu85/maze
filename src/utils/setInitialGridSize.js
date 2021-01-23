import { checkDevice } from '.';
import { setGridSize } from '../store/actions';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';
import { DEFAULT_GRID_SIZE } from '../constants/size';

function setInitialGridSize(dispatch) {
  const device = checkDevice();
  const localStorageKey = LOCAL_STORAGE_KEYS.gridSize[device];
  const storedGridSize = JSON.parse(localStorage.getItem(localStorageKey));

  if (storedGridSize) {
    dispatch(setGridSize(storedGridSize));
    return;
  }

  const defaultGridSize = DEFAULT_GRID_SIZE[device];
  dispatch(setGridSize(defaultGridSize));
}

export default setInitialGridSize;
