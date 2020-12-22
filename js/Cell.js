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
    this.eastWall = true;
    this.southWall = true;
    this.westWall = true;
    this.outerWalls = {};

    this.isEntrance = false;
    this.isExit = false;

    // State for maze generation and
    // visualization of maze generation algorithm.
    this.isVisited = false;
    this.isScanning = false;
    this.isStartCell = false;
    this.isConnected = false;
    // State for Randomized Kruskal's Algorithm
    this.cellSetId = '';
    this.isNeighbor = false;
    this.isInSameSet = false;
    this.isInDifferentSet = false;

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
    const east =
      currColIndex === grid[0].length - 1
        ? null
        : grid[currRowIndex][currColIndex + 1];
    const south =
      currRowIndex === grid.length - 1
        ? null
        : grid[currRowIndex + 1][currColIndex];
    const west =
      currColIndex === 0 ? null : grid[currRowIndex][currColIndex - 1];
    return [
      ['north', north],
      ['east', east],
      ['south', south],
      ['west', west],
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
      this.outerWalls.west = true;
    } else if (this.colIndex === width - 1) {
      this.outerWalls.east = true;
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

  draw(ctx, cellSize, colors, lineWidth) {
    ctx.fillStyle = this._getCtxFillStyle(colors);
    ctx.fillRect(this.startX, this.startY, cellSize, cellSize);

    if (this.opacity) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fillRect(this.startX, this.startY, cellSize, cellSize);
      this.opacity = this.opacity <= 0.85 ? this.opacity + 0.02 : this.opacity;
    }

    ctx.strokeStyle = colors.border;

    const halfLineWidth = Math.floor(lineWidth.interiorWall / 2);

    if (this.northWall) {
      ctx.lineWidth = this.outerWalls.north
        ? lineWidth.outerWall
        : lineWidth.interiorWall;
      ctx.beginPath();
      ctx.moveTo(this.startX - halfLineWidth, this.startY);
      ctx.lineTo(this.endX + halfLineWidth, this.startY);
      ctx.stroke();
    }

    if (this.eastWall) {
      ctx.lineWidth = this.outerWalls.east
        ? lineWidth.outerWall
        : lineWidth.interiorWall;
      ctx.beginPath();
      ctx.moveTo(this.endX, this.startY - halfLineWidth);
      ctx.lineTo(this.endX, this.endY + halfLineWidth);
      ctx.stroke();
    }

    if (this.southWall) {
      ctx.lineWidth = this.outerWalls.south
        ? lineWidth.outerWall
        : lineWidth.interiorWall;
      ctx.beginPath();
      ctx.moveTo(this.startX - halfLineWidth, this.endY);
      ctx.lineTo(this.endX + halfLineWidth, this.endY);
      ctx.stroke();
    }

    if (this.westWall) {
      ctx.lineWidth = this.outerWalls.west
        ? lineWidth.outerWall
        : lineWidth.interiorWall;
      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY - halfLineWidth);
      ctx.lineTo(this.startX, this.endY + halfLineWidth);
      ctx.stroke();
    }
  }

  _getCtxFillStyle(colors) {
    if (this.isStartCell) {
      return colors.start;
    }

    if (this.isScanning) {
      return colors.scanning;
    }

    if (this.isInSameSet) {
      return colors.sameSet;
    }

    if (this.isInDifferentSet) {
      return colors.differentSet;
    }

    if (this.isNeighbor) {
      return colors.neighbor;
    }

    if (this.isVisiting) {
      return colors.pathfinding.visiting;
    }

    if (this.isExitColor) {
      return colors.pathfinding.exitColor;
    }

    if (this.distanceToEntrance !== Infinity) {
      return colors.pathfinding.visited;
    }

    if (this.isVisited) {
      return colors.visited;
    }

    if (this.isConnected) {
      return colors.connected;
    }

    return colors.unvisited;
  }
}

export default Cell;
