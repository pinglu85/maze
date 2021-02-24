import { CELL_SIZE, LINE_WIDTHS } from '../constants/size';

function getRowAndColFromMousePos(canvasWrapper, e) {
  const rect = canvasWrapper.getBoundingClientRect();
  const mouseX = e.clientX - rect.left - LINE_WIDTHS.outerWall;
  const mouseY = e.clientY - rect.top - LINE_WIDTHS.outerWall;
  return {
    rowIndex: Math.floor(mouseY / CELL_SIZE),
    colIndex: Math.floor(mouseX / CELL_SIZE),
  };
}

export default getRowAndColFromMousePos;
