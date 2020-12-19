import Cell from './Cell.js';
import {
  asyncHuntAndKill,
  asyncRecursiveBacktracker,
  asyncRecursiveDivision,
  asyncBinaryTree,
  asyncAldousBroderAlgo,
} from './mazeGenerationAlgos/index.js';
import {
  getRandomIndex,
  getStartOrEndIndexOfArray,
  returnPromise,
} from './utils/index.js';

class Grid {
  constructor(width, height, cellSize, cellColors) {
    this.content = Array.from(new Array(height), (_, rowIndex) =>
      Array.from(new Array(width), (_, colIndex) => {
        const cell = new Cell(rowIndex, colIndex, cellSize, cellColors);
        cell.setGridBoundaries(height, width);
        return cell;
      })
    );
    this.entranceCell = null;
    this.entranceDir = '';
    this.exitCell = null;
    this.exitDir = '';
  }

  generateMazeEntryAndExit() {
    const numOfRows = this.content.length;
    const numOfCols = this.content[0].length;
    const entrance = {
      rowIndex: getRandomIndex(numOfRows),
      colIndex: null,
    };
    const exit = {
      rowIndex: null,
      colIndex: null,
    };
    if (entrance.rowIndex === 0 || entrance.rowIndex === numOfRows - 1) {
      entrance.colIndex = getRandomIndex(numOfCols);
    } else {
      const availColIndices = [0, numOfCols - 1];
      const randomIndex = getRandomIndex(availColIndices.length);
      entrance.colIndex = availColIndices[randomIndex];
    }

    exit.rowIndex = getStartOrEndIndexOfArray(entrance.rowIndex, numOfRows);

    if (exit.rowIndex !== null) {
      exit.colIndex = getRandomIndex(numOfCols);
    } else {
      exit.colIndex = getStartOrEndIndexOfArray(entrance.colIndex, numOfCols);
      exit.rowIndex = getRandomIndex(numOfRows);
    }

    this.entranceCell = this.content[entrance.rowIndex][entrance.colIndex];
    this.entranceCell.isEntrance = true;
    this.exitCell = this.content[exit.rowIndex][exit.colIndex];
    this.exitCell.isExit = true;
    this.entranceDir = this.entranceCell.dropRandomGridBoundary();
    this.exitDir = this.exitCell.dropRandomGridBoundary();
  }

  generateMaze(algo) {
    switch (algo) {
      case 'Hunt and Kill':
        return returnPromise(asyncHuntAndKill, this.content);
      case 'Recursive Backtracker':
        return returnPromise(asyncRecursiveBacktracker, this.content);
      case 'Recursive Division':
        this.dropInteriorWalls();
        return returnPromise(asyncRecursiveDivision, this.content);
      case 'Binary Tree':
        return returnPromise(asyncBinaryTree, this.content);
      case 'Aldous-Broder Algorithm':
        return returnPromise(asyncAldousBroderAlgo, this.content);
      default:
      // do nothing
    }
  }

  dropInteriorWalls() {
    for (const row of this.content) {
      for (const col of row) {
        col.isTransparent = true;
        const interiorWalls = {
          north: true,
          west: true,
          south: true,
          east: true,
        };
        for (const dir in col.gridBoundaries) {
          interiorWalls[dir] = false;
        }
        for (const dir in interiorWalls) {
          if (interiorWalls[dir]) {
            col.dropWall(dir);
          }
        }
      }
    }
  }

  clearSolution() {
    for (const row of this.content) {
      for (const col of row) {
        col.distanceToEntrance = Infinity;
        col.isExitColor = false;
        col.opacity = 0;
      }
    }
  }

  draw(ctx) {
    for (const row of this.content) {
      for (const col of row) {
        col.draw(ctx);
      }
    }
  }

  drawGuidelines(ctx, guidelineColor) {
    const width = this.content[0].length;
    const height = this.content.length;
    const cellSize = this.content[0][0].cellSize;

    ctx.lineWidth = 1;
    ctx.strokeStyle = guidelineColor;

    // Draw vertical lines
    for (let i = 1; i < width; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height * cellSize);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let j = 1; j < height; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * cellSize);
      ctx.lineTo(width * cellSize, j * cellSize);
      ctx.stroke();
    }
  }
}

export default Grid;
