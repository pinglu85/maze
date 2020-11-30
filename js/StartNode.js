class StartNode {
  constructor(rolIndex, colIndex, doorDir) {
    this.rowIndex = rolIndex;
    this.colIndex = colIndex;
    this.facingDir = {
      north: 'south',
      west: 'east',
      south: 'north',
      east: 'west'
    }[doorDir];
  }

  draw(ctx, cellSize) {
    let margin = cellSize / 5;
    let facingDirMargin = cellSize / 3;
    let chevronWidth = cellSize - margin * 2;
    let chevronStartX, chevronMiddleX, chevronEndX;
    chevronStartX = chevronMiddleX = chevronEndX = this.colIndex * cellSize;
    let chevronStartY, chevronMiddleY, chevronEndY;
    chevronStartY = chevronMiddleY = chevronEndY = this.rowIndex * cellSize;

    switch (this.facingDir) {
      case 'north':
        chevronStartX += margin;
        chevronStartY += (cellSize / 3) * 2;
        chevronMiddleX += cellSize / 2;
        chevronMiddleY += facingDirMargin;
        chevronEndX += margin + chevronWidth;
        chevronEndY += (cellSize / 3) * 2;
        break;
      case 'west':
        chevronStartX += cellSize / 3;
        chevronStartY += margin;
        chevronMiddleX += cellSize - facingDirMargin;
        chevronMiddleY += cellSize / 2;
        chevronEndX += cellSize / 3;
        chevronEndY += margin + chevronWidth;
        break;
      case 'south':
        chevronStartX += margin;
        chevronStartY += cellSize / 3;
        chevronMiddleX += cellSize / 2;
        chevronMiddleY += cellSize - facingDirMargin;
        chevronEndX += margin + chevronWidth;
        chevronEndY += cellSize / 3;
        break;
      case 'east':
        chevronStartX += (cellSize / 3) * 2;
        chevronStartY += margin;
        chevronMiddleX += facingDirMargin;
        chevronMiddleY += cellSize / 2;
        chevronEndX += (cellSize / 3) * 2;
        chevronEndY += margin + chevronWidth;
        break;
      default:
      // do nothing
    }

    ctx.lineWidth = 4.5;
    ctx.beginPath();
    ctx.moveTo(chevronStartX, chevronStartY);
    ctx.lineTo(chevronMiddleX, chevronMiddleY);
    ctx.lineTo(chevronEndX, chevronEndY);
    ctx.strokeStyle = '#c675ff';
    ctx.stroke();
    ctx.strokeStyle = '#000000';
  }
}

export default StartNode;
