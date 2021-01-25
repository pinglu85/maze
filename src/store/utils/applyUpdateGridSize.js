import { CELL_SIZE, LINE_WIDTHS } from '../../constants/size';

function applyUpdateGridSize(state, gridSize) {
  const { numOfRows, numOfCols } = gridSize;
  const offset =
    LINE_WIDTHS.outerWall + LINE_WIDTHS.halfOuterInteriorWallDiff * 2;
  const canvasWidth = Math.floor(numOfCols * CELL_SIZE) + offset;
  const canvasHeight = Math.floor(numOfRows * CELL_SIZE) + offset;

  return {
    ...state,
    gridSize,
    canvasSize: {
      width: canvasWidth,
      height: canvasHeight,
    },
    isMazeGenerated: false,
    isSolutionFound: false,
  };
}

export default applyUpdateGridSize;
