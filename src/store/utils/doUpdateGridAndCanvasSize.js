import { CELL_SIZE, LINE_WIDTH } from '../../constants/size';

function doUpdateGridAndCanvasSize(state, gridSize) {
  const { numOfRows, numOfCols } = gridSize;
  const offset =
    LINE_WIDTH.outerWall + LINE_WIDTH.halfOuterInteriorWallDiff * 2;
  const canvasWidth = Math.floor(numOfCols * CELL_SIZE) + offset;
  const canvasHeight = Math.floor(numOfRows * CELL_SIZE) + offset;

  return {
    ...state,
    gridSize,
    canvasSize: {
      width: canvasWidth,
      height: canvasHeight,
    },
    isGenerated: false,
    isSolutionFound: false,
  };
}

export default doUpdateGridAndCanvasSize;
