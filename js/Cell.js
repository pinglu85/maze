import { getRandomIndex } from './utils/index.js';

class Cell {
  constructor(rowIndex, colIndex, cellSize) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;

    // Coordinates on canvas.
    this.startX = Math.floor(this.colIndex * cellSize);
    this.startY = Math.floor(this.rowIndex * cellSize);
    this.centerX = this.startX + Math.floor(cellSize / 2);
    this.centerY = this.startY + Math.floor(cellSize / 2);
    this.endX = this.startX + cellSize;
    this.endY = this.startY + cellSize;

    // Walls.
    this.northWall = true;
    this.westWall = true;
    this.southWall = true;
    this.eastWall = true;
    this.outerWalls = {};

    this.isEntrance = false;
    this.isExit = false;

    // State for maze generation and
    // visualization of maze generation algorithm.
    this.isVisited = false;
    this.isScanning = false;
    this.isStartCell = false;
    this.isConnected = false;
    this.isTransparent = false;

    this.distanceToEntrance = Infinity;

    // State for visualization of pathfinding algorithm.
    this.isVisiting = false;
    this.isExitColor = false;
    this.opacity = 0;
  }

  dropWall(dir) {
    this[`${dir}Wall`] = false;
  }

  addWall(dir) {
    this[`${dir}Wall`] = true;
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
        const isConnected = !this[`${neighbor[0]}Wall`];
        return neighbor[1] && isConnected;
      })
      .map((neighbor) => neighbor[1]);
    return connectedNeighbors;
  }

  setOuterWalls(height, width) {
    if (this.rowIndex === 0) {
      this.outerWalls.north = true;
    } else if (this.rowIndex === height - 1) {
      this.outerWalls.south = true;
    }

    if (this.colIndex === 0) {
      this.outerWalls.east = true;
    } else if (this.colIndex === width - 1) {
      this.outerWalls.west = true;
    }
  }

  dropRandomOuterWall() {
    const outerWalls = Object.keys(this.outerWalls);
    if (!outerWalls.length) {
      return;
    }
    const randomOuterWallIndex = getRandomIndex(outerWalls.length);
    const droppedOuterWall = outerWalls[randomOuterWallIndex];
    this.dropWall(droppedOuterWall);
    return droppedOuterWall;
  }

  draw(ctx, cellSize, colors) {
    if (this.isStartCell) {
      ctx.fillStyle = colors.start;
    } else if (this.isScanning) {
      ctx.fillStyle = colors.scanning;
    } else if (this.isVisiting) {
      ctx.fillStyle = colors.pathfinding.visiting;
    } else if (this.isExitColor) {
      ctx.fillStyle = colors.pathfinding.exitColor;
    } else if (this.distanceToEntrance !== Infinity) {
      ctx.fillStyle = colors.pathfinding.visited;
    } else if (this.isVisited) {
      ctx.fillStyle = colors.visited;
    } else if (this.isConnected) {
      ctx.fillStyle = colors.connected;
    } else if (this.isTransparent) {
      ctx.fillStyle = 'transparent';
    } else {
      ctx.fillStyle = colors.unvisited;
    }

    ctx.fillRect(this.startX, this.startY, cellSize, cellSize);

    if (this.opacity) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fillRect(this.startX, this.startY, cellSize, cellSize);
      this.opacity = this.opacity <= 0.85 ? this.opacity + 0.02 : this.opacity;
    }

    ctx.strokeStyle = colors.border;

    if (this.northWall) {
      ctx.lineWidth = this.outerWalls.north ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.endX, this.startY);
      ctx.stroke();
    }

    if (this.eastWall) {
      ctx.lineWidth = this.outerWalls.east ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);
      ctx.lineTo(this.startX, this.endY);
      ctx.stroke();
    }

    if (this.southWall) {
      ctx.lineWidth = this.outerWalls.south ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.endY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    }

    if (this.westWall) {
      ctx.lineWidth = this.outerWalls.west ? 2.5 : 1;
      ctx.beginPath();
      ctx.moveTo(this.endX, this.startY);
      ctx.lineTo(this.endX, this.endY);
      ctx.stroke();
    }
  }
}

export default Cell;
