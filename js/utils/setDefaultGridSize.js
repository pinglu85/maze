export default function setDefaultGridSize() {
  if (window.matchMedia('(max-width: 576px)').matches) {
    return { numOfCols: 10, numOfRows: 8 };
  }

  if (window.matchMedia('(min-width: 577px) and (max-width: 769px)').matches) {
    return { numOfCols: 25, numOfRows: 15 };
  }

  return { numOfCols: 40, numOfRows: 16 };
}
