import { getRandomIndex } from '../../utils';

class Cell {
  constructor(rowIndex, colIndex, cellSize, offset) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;

    // Coordinates on canvas.
    this.startX = Math.floor(this.colIndex * cellSize) + offset;
    this.startY = Math.floor(this.rowIndex * cellSize) + offset;
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

    // State for Dijkstra's algorithm
    this.distanceToEntrance = Infinity;
    this.isToBeVisited = false;

    // State for A* Searching algorithm
    this.parent = null;
    this.isInOpenList = false;
    this.isInClosedList = false;
    this.g = Infinity;
    this.h = Infinity;
    this.f = Infinity;

    // State for visualization of pathfinding algorithm.
    this.isExitColor = false;
    this.opacity = 0;
  }

  resetStateForPathfinding() {
    this.distanceToEntrance = Infinity;
    this.isToBeVisited = false;
    this.isExitColor = false;
    this.opacity = 0;
    this.parent = null;
    this.isInOpenList = false;
    this.isInClosedList = false;
    this.g = Infinity;
    this.h = Infinity;
    this.f = Infinity;
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

  setOuterWalls(numOfRows, numOfCols) {
    if (this.rowIndex === 0) {
      this.outerWalls.north = true;
    } else if (this.rowIndex === numOfRows - 1) {
      this.outerWalls.south = true;
    }

    if (this.colIndex === 0) {
      this.outerWalls.west = true;
    } else if (this.colIndex === numOfCols - 1) {
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
    const halfInteriorWallLineWidth = Math.floor(lineWidth.interiorWall / 2);

    const fillRectStartX = this.startX + halfInteriorWallLineWidth;
    const fillRectStartY = this.startY + halfInteriorWallLineWidth;
    const fillRectSize = cellSize - lineWidth.interiorWall;

    ctx.fillStyle = this._getCtxFillStyle(colors);
    ctx.fillRect(fillRectStartX, fillRectStartY, fillRectSize, fillRectSize);

    if (this.opacity) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fillRect(fillRectStartX, fillRectStartY, fillRectSize, fillRectSize);
      this.opacity = this.opacity < 0.8 ? this.opacity + 0.2 : this.opacity;
    }

    ctx.strokeStyle = colors.border;

    const startXWithLineWidthOffset = this.outerWalls.west
      ? this.startX - lineWidth.outerWall
      : this.startX - halfInteriorWallLineWidth;
    const startYWithLineWidthOffset = this.outerWalls.north
      ? this.startY - lineWidth.outerWall
      : this.startY - halfInteriorWallLineWidth;
    const endXWithLineWidthOffset = this.outerWalls.east
      ? this.endX + lineWidth.outerWall
      : this.endX + halfInteriorWallLineWidth;
    const endYWithLineWidthOffset = this.outerWalls.south
      ? this.endY + lineWidth.outerWall
      : this.endY + halfInteriorWallLineWidth;

    if (this.northWall) {
      let startY = this.startY;

      ctx.lineWidth = lineWidth.interiorWall;

      if (this.outerWalls.north) {
        ctx.lineWidth = lineWidth.outerWall;
        startY -= lineWidth.halfOuterInteriorWallDiff;
      }

      ctx.beginPath();
      ctx.moveTo(startXWithLineWidthOffset, startY);
      ctx.lineTo(endXWithLineWidthOffset, startY);
      ctx.stroke();
    }

    if (this.eastWall) {
      let endX = this.endX;

      ctx.lineWidth = lineWidth.interiorWall;

      if (this.outerWalls.east) {
        ctx.lineWidth = lineWidth.outerWall;
        endX += lineWidth.halfOuterInteriorWallDiff;
      }

      ctx.beginPath();
      ctx.moveTo(endX, startYWithLineWidthOffset);
      ctx.lineTo(endX, endYWithLineWidthOffset);
      ctx.stroke();
    }

    if (this.southWall) {
      let endY = this.endY;

      ctx.lineWidth = lineWidth.interiorWall;

      if (this.outerWalls.south) {
        ctx.lineWidth = lineWidth.outerWall;
        endY += lineWidth.halfOuterInteriorWallDiff;
      }

      ctx.beginPath();
      ctx.moveTo(startXWithLineWidthOffset, endY);
      ctx.lineTo(endXWithLineWidthOffset, endY);
      ctx.stroke();
    }

    if (this.westWall) {
      let startX = this.startX;

      ctx.lineWidth = lineWidth.interiorWall;

      if (this.outerWalls.west) {
        ctx.lineWidth = lineWidth.outerWall;
        startX -= lineWidth.halfOuterInteriorWallDiff;
      }

      ctx.beginPath();
      ctx.moveTo(startX, startYWithLineWidthOffset);
      ctx.lineTo(startX, endYWithLineWidthOffset);
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

    if (this.isToBeVisited || this.isInOpenList) {
      return colors.pathfinding.toBeVisited;
    }

    if (this.isExitColor) {
      return colors.pathfinding.exitColor;
    }

    if (this.isInClosedList) {
      return colors.pathfinding.visited;
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
