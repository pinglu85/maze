export default function setDefaultGridSize(gridSize) {
  if (window.matchMedia('(max-width: 576px)').matches) {
    gridSize.numOfRows = 8;
    gridSize.numOfCols = 9;
    return;
  }

  if (window.matchMedia('(min-width: 577px) and (max-width: 768px)').matches) {
    gridSize.numOfRows = 15;
    gridSize.numOfCols = 20;
    return;
  }

  if (window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches) {
    gridSize.numOfRows = 15;
    gridSize.numOfCols = 30;
    return;
  }

  gridSize.numOfRows = 14;
  gridSize.numOfCols = 40;
  return;
}
