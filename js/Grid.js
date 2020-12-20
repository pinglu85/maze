import Cell from './Cell.js';
import {
  asyncHuntAndKill,
  asyncRecursiveBacktracker,
  asyncRecursiveDivision,
  asyncBinaryTree,
  asyncAldousBroderAlgo,
} from './mazeGenerationAlgos/index.js';
import { getRandomIndex, getStartOrEndIndexOfArray } from './utils/index.js';

class Grid {
  constructor(cellSize, cellColors, guidelineColor) {
    this.content = [];
    this.cellSize = cellSize;
    this.cellColors = cellColors;
    this.guidelineColor = guidelineColor;
    this.entranceCell = null;
    this.entranceDir = '';
    this.exitCell = null;
    this.exitDir = '';
  }

  setContent(width, height) {
    this.content = Array.from(new Array(height), (_, rowIndex) =>
      Array.from(new Array(width), (_, colIndex) => {
        const cell = new Cell(rowIndex, colIndex, this.cellSize);
        cell.setOuterWalls(height, width);
        return cell;
      })
    );
  }

  generateMaze(algo) {
    const asyncGenerateMaze = async (mazeGenerationAlgo) => {
      await mazeGenerationAlgo(this.content);
      this.generateMazeEntryAndExit();
      return Promise.resolve(false);
    };

    switch (algo) {
      case 'Hunt and Kill':
        return asyncGenerateMaze(asyncHuntAndKill);
      case 'Recursive Backtracker':
        return asyncGenerateMaze(asyncRecursiveBacktracker);
      case 'Recursive Division':
        this.dropInteriorWalls();
        return asyncGenerateMaze(asyncRecursiveDivision);
      case 'Binary Tree':
        return asyncGenerateMaze(asyncBinaryTree);
      case 'Aldous-Broder Algorithm':
        return asyncGenerateMaze(asyncAldousBroderAlgo);
      default:
      // do nothing
    }
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
    this.entranceDir = this.entranceCell.dropRandomOuterWall();
    this.exitDir = this.exitCell.dropRandomOuterWall();
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
        for (const dir in col.outerWalls) {
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
        col.draw(ctx, this.cellSize, this.cellColors);
      }
    }
  }

  drawGuidelines(ctx) {
    const width = this.content[0].length;
    const height = this.content.length;

    ctx.lineWidth = 1;
    ctx.strokeStyle = this.guidelineColor;

    // Draw vertical lines
    for (let i = 1; i < width; i++) {
      ctx.beginPath();
      ctx.moveTo(i * this.cellSize, 0);
      ctx.lineTo(i * this.cellSize, height * this.cellSize);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let j = 1; j < height; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * this.cellSize);
      ctx.lineTo(width * this.cellSize, j * this.cellSize);
      ctx.stroke();
    }
  }
}

export default Grid;
