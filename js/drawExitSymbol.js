function drawExitSymbol(ctx, rowIndex, colIndex, cellSize) {
  const halfCellSize = cellSize / 2;
  const startX = colIndex * cellSize + halfCellSize;
  const startY = rowIndex * cellSize + halfCellSize;
  const endAngle = Math.PI * 2;
  const smallCircleRadius = halfCellSize / 3;
  const bigCircleRadius = (halfCellSize / 3) * 2;
  const color = '#c675ff';
  ctx.lineWidth = cellSize / 10;

  ctx.beginPath();
  ctx.arc(startX, startY, smallCircleRadius, 0, endAngle);
  ctx.fillStyle = color;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(startX, startY, bigCircleRadius, 0, endAngle);
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.strokeStyle = '#000000';
}

export default drawExitSymbol;
