import { MIN_GRID_SIZE, MAX_GRID_SIZE } from '../constants/size';

export default function parseInputValue(inputValue) {
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
