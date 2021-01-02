import { MIN_GRID_SIZE, MAX_GRID_SIZE } from '../constants/size';

const inputCols = document.getElementById('cols');
const inputRows = document.getElementById('rows');

export const updateInputs = (numOfCols, numOfRows) => {
  inputCols.value = numOfCols;
  inputRows.value = numOfRows;
};

export const parseInputValue = (id) => {
  let domNode = id === 'rows' ? inputRows : inputCols;

  if (!domNode.value) {
    return null;
  }

  const val = parseInt(domNode.value);
  const isValid = validateInputValue(val);
  if (!isValid) {
    return null;
  }

  domNode.value = val;
  return val;
};

function validateInputValue(val) {
  return val >= MIN_GRID_SIZE && val <= MAX_GRID_SIZE;
}
