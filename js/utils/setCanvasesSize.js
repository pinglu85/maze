export default function setCanvasesSize(
  canvases,
  numOfCols,
  numOfRows,
  cellSize,
  canvasWrapperNode
) {
  const canvasWidth = Math.floor(numOfCols * cellSize);
  const canvasHeight = Math.floor(numOfRows * cellSize);

  canvases.forEach((canvas) => {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  });
  canvasWrapperNode.style.width = `${canvasWidth}px`;
  canvasWrapperNode.style.height = `${canvasHeight}px`;

  return { canvasWidth, canvasHeight };
}
