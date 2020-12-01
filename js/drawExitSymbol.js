function drawExitSymbol(ctx, rowIndex, colIndex, cellSize, symbolColor) {
  const halfCellSize = cellSize / 2;
  const startX = colIndex * cellSize + halfCellSize;
  const startY = rowIndex * cellSize + halfCellSize;
  const endAngle = Math.PI * 2;
  const smallCircleRadius = halfCellSize / 3;
  const bigCircleRadius = (halfCellSize / 3) * 2;
  ctx.lineWidth = cellSize / 10;

  ctx.beginPath();
  ctx.arc(startX, startY, smallCircleRadius, 0, endAngle);
  ctx.fillStyle = symbolColor;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(startX, startY, bigCircleRadius, 0, endAngle);
  ctx.strokeStyle = symbolColor;
  ctx.stroke();
}

export default drawExitSymbol;
