import getRandomIndex from './utils/getRandomIndex.js';

class Cell {
  constructor(rowIndex, colIndex) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.northEdge = true;
    this.westEdge = true;
    this.southEdge = true;
    this.eastEdge = true;
    this.boundaries = {};
    this.isVisited = false;
    this.isScanning = false;
    this.isStartCell = false;
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

  setBoundaries(height, width) {
    if (this.rowIndex === 0) {
      this.boundaries.north = true;
    } else if (this.rowIndex === height - 1) {
      this.boundaries.south = true;
    }

    if (this.colIndex === 0) {
      this.boundaries.east = true;
    } else if (this.colIndex === width - 1) {
      this.boundaries.west = true;
    }
  }

  dropRandomBoundary() {
    const boundaries = Object.keys(this.boundaries);
    if (!boundaries.length) {
      return;
    }
    const randomBoundaryIndex = getRandomIndex(boundaries.length);
    const droppedBoundary = boundaries[randomBoundaryIndex];
    this.dropEdge(droppedBoundary);
    return droppedBoundary;
  }

  draw(ctx, startX, startY, cellSize) {
    ctx.clearRect(startX, startY, cellSize, cellSize);
    ctx.fillStyle = this.isStartCell
      ? '#57b3f9'
      : this.isScanning
      ? '#7cefb0'
      : this.isVisited
      ? '#ffffff'
      : '#d3d3d3';
    ctx.fillRect(startX, startY, cellSize, cellSize);

    if (this.northEdge) {
      ctx.lineWidth = this.boundaries.north ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX + cellSize, startY);
      ctx.stroke();
    }

    if (this.eastEdge) {
      ctx.lineWidth = this.boundaries.east ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, startY + cellSize);
      ctx.stroke();
    }

    if (this.southEdge) {
      ctx.lineWidth = this.boundaries.south ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(startX, startY + cellSize);
      ctx.lineTo(startX + cellSize, startY + cellSize);
      ctx.stroke();
    }

    if (this.westEdge) {
      ctx.lineWidth = this.boundaries.west ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(startX + cellSize, startY);
      ctx.lineTo(startX + cellSize, startY + cellSize);
      ctx.stroke();
    }
  }
}

export default Cell;
