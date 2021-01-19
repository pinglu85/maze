import Cell from './Cell';
import * as mazeAlgos from './mazeAlgos';
import * as pathfindingAlgos from './pathfindingAlgos';
import { getRandomIndex, getStartOrEndIndexOfArray } from '../utils';
import { CELL_COLORS, GUIDES_COLOR } from '../constants/colors';
import { CELL_SIZE, LINE_WIDTHS } from '../constants/size';

class Grid {
  constructor(cellSize, cellColors, lineWidths, guidesColor) {
    this.content = [];
    this.cellSize = cellSize;
    this.cellColors = cellColors;
    this.lineWidths = lineWidths;
    this.cellPosOffSet =
      Math.floor(this.lineWidths.outerWall / 2) +
      this.lineWidths.halfOuterInteriorWallDiff;
    this.guidesColor = guidesColor;
    this.entranceCell = null;
    this.entranceDir = '';
    this.exitCell = null;
    this.exitDir = '';
  }

  setContent = ({ numOfRows, numOfCols }) => {
    this.content = Array.from(new Array(numOfRows), (_, rowIndex) =>
      Array.from(new Array(numOfCols), (_, colIndex) => {
        const cell = new Cell(
          rowIndex,
          colIndex,
          this.cellSize,
          this.cellPosOffSet
        );
        cell.setOuterWalls(numOfRows, numOfCols);
        return cell;
      })
    );
  };

  generateMaze(algo) {
    const asyncGenerateMaze = async (mazeAlgo, arg) => {
      await mazeAlgo(this.content, arg);
      this.generateMazeEntryAndExit();
      return Promise.resolve();
    };

    switch (algo) {
      case 'Hunt-and-Kill':
        return asyncGenerateMaze(mazeAlgos.asyncHuntAndKill);
      case 'Recursive Backtracker':
        return asyncGenerateMaze(mazeAlgos.asyncRecursiveBacktracker);
      case 'Recursive Division':
        this.dropInteriorWalls();
        return asyncGenerateMaze(mazeAlgos.asyncRecursiveDivision);
      case 'Growing Tree (random)':
        return asyncGenerateMaze(mazeAlgos.asyncGrowingTree, 'random');
      case 'Growing Tree (last)':
        return asyncGenerateMaze(mazeAlgos.asyncGrowingTree, 'last');
      case 'Growing Tree (mix)':
        return asyncGenerateMaze(mazeAlgos.asyncGrowingTree, 'mix');
      case 'Binary Tree':
        return asyncGenerateMaze(mazeAlgos.asyncBinaryTree);
      case "Randomized Kruskal's Algorithm":
        return asyncGenerateMaze(mazeAlogs.asyncRandomizedKruskalsAlgo);
      case 'Aldous-Broder Algorithm':
        return asyncGenerateMaze(mazeAlgos.asyncAldousBroderAlgo);
      case 'Open Grid':
        this.dropInteriorWalls();
        this.generateMazeEntryAndExit();
        return Promise.resolve();
      default:
      // do nothing
    }
  }

  findSolution(algo) {
    const asyncFindSolution = async (pathfindingAlgo) => {
      const pathCoordinates = await pathfindingAlgo(
        this.content,
        this.entranceCell,
        this.exitCell
      );
      return Promise.resolve(pathCoordinates);
    };

    switch (algo) {
      case "Dijkstra's Algorithm":
        return asyncFindSolution(pathfindingAlgos.asyncDijkstrasAlgo);
      case 'A* Search':
        return asyncFindSolution(pathfindingAlgos.asyncAStarSearch);
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
      for (const cell of row) {
        cell.isVisited = true;
        const interiorWalls = {
          north: true,
          east: true,
          south: true,
          west: true,
        };
        for (const dir in cell.outerWalls) {
          interiorWalls[dir] = false;
        }
        for (const dir in interiorWalls) {
          if (interiorWalls[dir]) {
            cell.dropWall(dir);
          }
        }
      }
    }
  }

  clearSolution() {
    for (const row of this.content) {
      for (const cell of row) {
        cell.resetStateForPathfinding();
      }
    }
  }

  draw = (ctx) => {
    for (const row of this.content) {
      for (const cell of row) {
        cell.draw(ctx, this.cellSize, this.cellColors, this.lineWidths);
      }
    }
  };

  drawGuides(ctx) {
    const numOfRows = this.content.length;
    const numOfCols = this.content[0].length;
    const width = numOfCols * this.cellSize + this.cellPosOffSet;
    const height = numOfRows * this.cellSize + this.cellPosOffSet;

    ctx.lineWidth = this.lineWidths.interiorWall;
    ctx.strokeStyle = this.guidesColor;

    // Draw horizontal lines
    for (let i = 1; i < numOfRows; i++) {
      const posY = i * this.cellSize + this.cellPosOffSet;
      ctx.beginPath();
      ctx.moveTo(0, posY);
      ctx.lineTo(width, posY);
      ctx.stroke();
    }

    // Draw vertical lines
    for (let j = 1; j < numOfCols; j++) {
      const posX = j * this.cellSize + this.cellPosOffSet;
      ctx.beginPath();
      ctx.moveTo(posX, 0);
      ctx.lineTo(posX, height);
      ctx.stroke();
    }
  }
}

const grid = new Grid(CELL_SIZE, CELL_COLORS, LINE_WIDTHS, GUIDES_COLOR);
export default grid;
