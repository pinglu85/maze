import getRandomIndex from './utils/getRandomIndex.js';

class Cell {
  constructor(rowIndex, colIndex, cellSize) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.cellSize = cellSize;
    this.northEdge = true;
    this.westEdge = true;
    this.southEdge = true;
    this.eastEdge = true;
    this.boundaries = {};
    this.isVisited = false;
    this.isScanning = false;
    this.isStartCell = false;
    this.distanceToEntrance = Infinity;
  }

  dropEdge(...args) {
    for (const arg of args) {
      this[`${arg}Edge`] = false;
    }
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

  getConnectedNeighbors(grid) {
    const neighbors = this.getNeighbors(grid);
    const connectedNeighbors = neighbors.filter((neighbor) => {
      const isConnected = !this[`${neighbor[0]}Edge`];
      return neighbor[1] && isConnected;
    });
    return connectedNeighbors;
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

  draw(ctx, cellColors) {
    const cellSize = this.cellSize;
    const startX = this.colIndex * cellSize;
    const startY = this.rowIndex * cellSize;
    ctx.clearRect(startX, startY, cellSize, cellSize);
    ctx.fillStyle = this.isStartCell
      ? cellColors.start
      : this.isScanning
      ? cellColors.scanning
      : this.isVisited
      ? cellColors.visited
      : cellColors.unvisited;
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

  drawSolution(ctx, previousDir, nextDir, solutionColor) {
    const cellSize = this.cellSize;
    const halfCellSize = cellSize / 2;
    const startX = this.colIndex * cellSize;
    const startY = this.rowIndex * cellSize;
    const centerX = startX + halfCellSize;
    const centerY = startY + halfCellSize;

    ctx.lineWidth = halfCellSize / 2;

    ctx.beginPath();

    switch (previousDir) {
      case 'north':
        ctx.moveTo(centerX, startY);
        break;
      case 'west':
        ctx.moveTo(startX + cellSize, centerY);
        break;
      case 'south':
        ctx.moveTo(centerX, startY + cellSize);
        break;
      case 'east':
        ctx.moveTo(startX, centerY);
        break;
      default:
      // do nothing
    }

    ctx.lineTo(centerX, centerY);

    switch (nextDir) {
      case 'north':
        ctx.lineTo(centerX, startY);
        break;
      case 'west':
        ctx.lineTo(startX + cellSize, centerY);
        break;
      case 'south':
        ctx.lineTo(centerX, startY + cellSize);
        break;
      case 'east':
        ctx.lineTo(startX, centerY);
        break;
      default:
      // do nothing
    }
    ctx.strokeStyle = solutionColor;
    ctx.stroke();
  }
}

export default Cell;
