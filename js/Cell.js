import getRandomIndex from './utils/getRandomIndex.js';

class Cell {
  constructor(rowIndex, colIndex) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.isVisited = false;
    this.northEdge = true;
    this.westEdge = true;
    this.southEdge = true;
    this.eastEdge = true;
  }

  dropEdge(...args) {
    for (const arg of args) {
      this[`${arg}Edge`] = false;
    }
  }

  dropOppositeEdge(edge) {
    let oppositeEdge;
    switch (edge) {
      case 'north':
        oppositeEdge = 'south';
        break;
      case 'west':
        oppositeEdge = 'east';
        break;
      case 'south':
        oppositeEdge = 'north';
        break;
      case 'east':
        oppositeEdge = 'west';
        break;
      default:
        throw new Error('should not reach here');
    }
    this.dropEdge(oppositeEdge);
  }

  getNeighbors(grid) {
    const currRowIndex = this.rowIndex;
    const currColIndex = this.colIndex;
    const north =
      currRowIndex === 0 ? null : grid[currRowIndex - 1][currColIndex];
    const west =
      currColIndex === grid[0].length - 1
        ? null
        : grid[currRowIndex][currColIndex + 1];
    const south =
      currRowIndex === grid.length - 1
        ? null
        : grid[currRowIndex + 1][currColIndex];
    const east =
      currColIndex === 0 ? null : grid[currRowIndex][currColIndex - 1];
    return [
      ['north', north],
      ['west', west],
      ['south', south],
      ['east', east]
    ];
  }

  getRandomAvailNeighbor(grid) {
    const neighbors = this.getNeighbors(grid);
    const availNeighbors = neighbors.filter(
      (neighbor) => neighbor[1] && !neighbor[1].isVisited
    );
    const randomIndex = getRandomIndex(availNeighbors.length);
    return randomIndex === null ? null : availNeighbors[randomIndex];
  }

  getRandomVisitedNeighbor(grid) {
    const neighbors = this.getNeighbors(grid);
    const visitedNeighbors = neighbors.filter(
      (neighbor) => neighbor[1] && neighbor[1].isVisited
    );
    const randomIndex = getRandomIndex(visitedNeighbors.length);
    return randomIndex === null ? null : visitedNeighbors[randomIndex];
  }

  draw(ctx, startX, startY, cellSize) {
    ctx.clearRect(startX, startY, cellSize, cellSize);
    ctx.fillStyle = this.isVisited ? '#ffffff' : '#d3d3d3';
    ctx.fillRect(startX, startY, cellSize, cellSize);

    ctx.lineWidth = 1;

    if (this.northEdge) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + cellSize, startY);
      ctx.stroke();
    }

    if (this.eastEdge) {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, startY + cellSize);
      ctx.stroke();
    }

    if (this.southEdge) {
      ctx.beginPath();
      ctx.moveTo(startX, startY + cellSize);
      ctx.lineTo(startX + cellSize, startY + cellSize);
      ctx.stroke();
    }

    if (this.westEdge) {
      ctx.beginPath();
      ctx.moveTo(startX + cellSize, startY);
      ctx.lineTo(startX + cellSize, startY + cellSize);
      ctx.stroke();
    }
  }
}

export default Cell;
