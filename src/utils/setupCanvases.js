import { CELL_SIZE, LINE_WIDTH } from '../constants/size';

const canvasWrapper = document.getElementById('canvas-wrapper');
const mazeCanvas = document.getElementById('maze-canvas');
const solutionCanvas = document.getElementById('solution-canvas');
const canvases = [mazeCanvas, solutionCanvas];

function setupCanvases() {
  const ctxes = canvases.map((canvas) => canvas.getContext('2d'));

  const setCanvasesSize = (gridSize, canvasSize) => {
    const { numOfRows, numOfCols } = gridSize;
    const offset =
      LINE_WIDTH.outerWall + LINE_WIDTH.halfOuterInteriorWallDiff * 2;
    const canvasWidth = Math.floor(numOfCols * CELL_SIZE) + offset;
    const canvasHeight = Math.floor(numOfRows * CELL_SIZE) + offset;

    canvases.forEach((canvas) => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    });
    canvasWrapper.style.width = `${canvasWidth}px`;
    canvasWrapper.style.height = `${canvasHeight}px`;

    canvasSize.width = canvasWidth;
    canvasSize.height = canvasHeight;
  };

  return [ctxes, setCanvasesSize];
}

export default setupCanvases;
