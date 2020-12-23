export default function setupCanvases(canvasWrapperNode, ...canvases) {
  const ctxes = canvases.map((canvas) => canvas.getContext('2d'));
  const setCanvasesSize = (numOfCols, numOfRows, cellSize, lineWidth) => {
    const offset =
      lineWidth.outerWall + lineWidth.halfOuterInteriorWallDiff * 2;
    const canvasWidth = Math.floor(numOfCols * cellSize) + offset;
    const canvasHeight = Math.floor(numOfRows * cellSize) + offset;

    canvases.forEach((canvas) => {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    });
    canvasWrapperNode.style.width = `${canvasWidth}px`;
    canvasWrapperNode.style.height = `${canvasHeight}px`;

    return { canvasWidth, canvasHeight };
  };

  return [ctxes, setCanvasesSize];
}
