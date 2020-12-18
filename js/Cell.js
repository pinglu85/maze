import getRandomIndex from './utils/getRandomIndex.js';

class Cell {
  constructor(rowIndex, colIndex, cellSize, colors) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    this.cellSize = cellSize;
    this.colors = colors;

    // Coordinates on canvas.
    this.startX = Math.floor(this.colIndex * cellSize);
    this.startY = Math.floor(this.rowIndex * cellSize);
    this.centerX = this.startX + Math.floor(cellSize / 2);
    this.centerY = this.startY + Math.floor(cellSize / 2);
    this.endX = this.startX + cellSize;
    this.endY = this.startY + cellSize;

    // Walls.
    this.northEdge = true;
    this.westEdge = true;
    this.southEdge = true;
    this.eastEdge = true;
    this.boundaries = {};

    this.isEntrance = false;
    this.isExit = false;

    // State for maze generation and
    // visualization of maze generation algorithm.
    this.isVisited = false;
    this.isScanning = false;
    this.isStartCell = false;
    this.isConnected = false;

    this.distanceToEntrance = Infinity;

    // State for visualization of pathfinding algorithm.
    this.isVisiting = false;
    this.isExitColor = false;
    this.opacity = 0;
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
      ['east', east],
    ];
  }

  getRandomNeighbor(grid) {
    const neighbors = this.getNeighbors(grid).filter((neighbor) => neighbor[1]);
    const randomIndex = getRandomIndex(neighbors.length);
    return neighbors[randomIndex];
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
    const connectedNeighbors = neighbors
      .filter((neighbor) => {
        const isConnected = !this[`${neighbor[0]}Edge`];
        return neighbor[1] && isConnected;
      })
      .map((neighbor) => neighbor[1]);
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

  draw(ctx) {
    if (this.isStartCell) {
      ctx.fillStyle = this.colors.start;
    } else if (this.isScanning) {
      ctx.fillStyle = this.colors.scanning;
    } else if (this.isVisiting) {
      ctx.fillStyle = this.colors.pathfinding.visiting;
    } else if (this.isExitColor) {
      ctx.fillStyle = this.colors.pathfinding.exitColor;
    } else if (this.distanceToEntrance !== Infinity) {
      ctx.fillStyle = this.colors.pathfinding.visited;
    } else if (this.isVisited) {
      ctx.fillStyle = this.colors.visited;
    } else if (this.isConnected) {
      ctx.fillStyle = this.colors.connected;
    } else {
      ctx.fillStyle = this.colors.unvisited;
    }

    ctx.fillRect(this.startX, this.startY, this.cellSize, this.cellSize);

    if (this.opacity) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fillRect(this.startX, this.startY, this.cellSize, this.cellSize);
      this.opacity = this.opacity <= 0.85 ? this.opacity + 0.02 : this.opacity;
    }

    if (this.northEdge) {
      ctx.lineWidth = this.boundaries.north ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.endX, this.startY);
      ctx.stroke();
    }

    if (this.eastEdge) {
      ctx.lineWidth = this.boundaries.east ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.startX, this.endY);
      ctx.stroke();
    }

    if (this.southEdge) {
      ctx.lineWidth = this.boundaries.south ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.endY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    }

    if (this.westEdge) {
      ctx.lineWidth = this.boundaries.west ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.endX, this.startY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    }
  }
}

export default Cell;
