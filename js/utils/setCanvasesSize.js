export default function setCanvasesSize(
  canvases,
  numOfCols,
  numOfRows,
  cellSize,
  lineWidth,
  canvasWrapperNode
) {
  const offset = lineWidth.outerWall + lineWidth.halfOuterInteriorWallDiff * 2;
  const canvasWidth = Math.floor(numOfCols * cellSize) + offset;
  const canvasHeight = Math.floor(numOfRows * cellSize) + offset;

  canvases.forEach((canvas) => {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
  });
  canvasWrapperNode.style.width = `${canvasWidth}px`;
  canvasWrapperNode.style.height = `${canvasHeight}px`;

  return { canvasWidth, canvasHeight };
}
