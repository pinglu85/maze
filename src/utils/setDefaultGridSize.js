export default function setDefaultGridSize() {
  if (window.matchMedia('(max-width: 576px)').matches) {
    return { numOfRows: 8, numOfCols: 9 };
  }

  if (window.matchMedia('(min-width: 577px) and (max-width: 768px)').matches) {
    return { numOfRows: 15, numOfCols: 20 };
  }

  if (window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches) {
    return { numOfRows: 15, numOfCols: 30 };
  }

  return { numOfRows: 14, numOfCols: 40 };
}
