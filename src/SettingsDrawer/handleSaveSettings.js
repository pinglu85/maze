import { doUpdateGridSize } from './actionCreators';
import showWarning from './showWarning';
import { checkDevice } from '../utils';
import { MIN_GRID_SIZE, MAX_GRID_SIZE } from '../constants/size';
import LOCAL_STORAGE_KEYS from '../constants/localStorageKeys';

function handleSaveSettings(store, warningRef, inputValues, handleDrawerClose) {
  const state = store.getState();
  if (state.isMazeGenerating || state.isSearchingForSolution) {
    handleDrawerClose();
    return;
  }

  const warningMessage = 'enter a valid number for';

  const updatedNumOfRows = parseInputValue(inputValues.rows);
  if (!updatedNumOfRows) {
    showWarning(warningRef, `${warningMessage} rows`);
    return;
  }

  const updatedNumOfCols = parseInputValue(inputValues.cols);
  if (!updatedNumOfCols) {
    showWarning(warningRef, `${warningMessage} columns`);
    return;
  }

  const {
    gridSize: { numOfRows, numOfCols },
  } = state;
  const isGridSizeChanged =
    numOfRows !== updatedNumOfRows || numOfCols !== updatedNumOfCols;
  if (!isGridSizeChanged) {
    handleDrawerClose();
    return;
  }

  const updatedGridSize = {
    numOfRows: updatedNumOfRows,
    numOfCols: updatedNumOfCols,
  };

  saveGridSizeToLocalStorage(updatedGridSize);
  store.dispatch(doUpdateGridSize(updatedGridSize));
  handleDrawerClose();
}

function parseInputValue(inputValue) {
  if (!inputValue) {
    return null;
  }

  const value = parseInt(inputValue);
  const isValid = validateInputValue(value);
  if (!isValid) {
    return null;
  }

  return value;
}

function validateInputValue(value) {
  return value >= MIN_GRID_SIZE && value <= MAX_GRID_SIZE;
}

function saveGridSizeToLocalStorage(gridSize) {
  const stringifiedGridSize = JSON.stringify(gridSize);
  const device = checkDevice();
  const localStorageKey = LOCAL_STORAGE_KEYS.gridSize[device];

  localStorage.setItem(localStorageKey, stringifiedGridSize);
}

export default handleSaveSettings;
