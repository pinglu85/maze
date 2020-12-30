export default function setDefaultGridSize() {
  if (window.matchMedia('(max-width: 576px)').matches) {
    return { numOfCols: 8, numOfRows: 8 };
  }

  if (window.matchMedia('(min-width: 577px) and (max-width: 768px)').matches) {
    return { numOfCols: 20, numOfRows: 15 };
  }

  if (window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches) {
    return { numOfCols: 30, numOfRows: 15 };
  }

  return { numOfCols: 40, numOfRows: 16 };
}
