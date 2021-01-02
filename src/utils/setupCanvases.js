const canvasWrapper = document.getElementById('canvas-wrapper');
const mazeCanvas = document.getElementById('maze-canvas');
const solutionCanvas = document.getElementById('solution-canvas');
const canvases = [mazeCanvas, solutionCanvas];

function setupCanvases() {
  const ctxes = canvases.map((canvas) => canvas.getContext('2d'));
  const setCanvasesSize = (numOfRows, numOfCols, cellSize, lineWidth) => {
    const offset =
      lineWidth.outerWall + lineWidth.halfOuterInteriorWallDiff * 2;
    const canvasWidth = Math.floor(numOfCols * cellSize) + offset;
    const canvasHeight = Math.floor(numOfRows * cellSize) + offset;

    canvases.forEach((canvas) => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    });
    canvasWrapper.style.width = `${canvasWidth}px`;
    canvasWrapper.style.height = `${canvasHeight}px`;

    return { canvasWidth, canvasHeight };
  };

  return [ctxes, setCanvasesSize];
}

export default setupCanvases;
