import Cell from './Cell.js';
import {
  asyncHuntAndKill,
  asyncRecursiveBacktracker,
  asyncRecursiveDivision,
  asyncGrowingTree,
  asyncBinaryTree,
  asyncRandomizedKruskalsAlgo,
  asyncAldousBroderAlgo,
} from './mazeGenerationAlgos/index.js';
import {
  asyncAStarSearch,
  asyncDijkstrasAlgo,
} from './pathfindingAlgos/index.js';
import { getRandomIndex, getStartOrEndIndexOfArray } from './utils/index.js';

class Grid {
  constructor(cellSize, cellColors, lineWidth) {
    this.content = [];
    this.cellSize = cellSize;
    this.cellColors = cellColors;
    this.lineWidth = lineWidth;
    this.entranceCell = null;
    this.entranceDir = '';
    this.exitCell = null;
    this.exitDir = '';
  }

  setContent(width, height) {
    const offset =
      Math.floor(this.lineWidth.outerWall / 2) +
      this.lineWidth.halfOuterInteriorWallDiff;

    this.content = Array.from(new Array(height), (_, rowIndex) =>
      Array.from(new Array(width), (_, colIndex) => {
        const cell = new Cell(rowIndex, colIndex, this.cellSize, offset);
        cell.setOuterWalls(height, width);
        return cell;
      })
    );
  }

  generateMaze(algo) {
    const asyncGenerateMaze = async (mazeGenerationAlgo, arg) => {
      await mazeGenerationAlgo(this.content, arg);
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
      case 'Growing Tree (random)':
        return asyncGenerateMaze(asyncGrowingTree, 'random');
      case 'Growing Tree (last)':
        return asyncGenerateMaze(asyncGrowingTree, 'last');
      case 'Growing Tree (mix)':
        return asyncGenerateMaze(asyncGrowingTree, 'mix');
      case 'Binary Tree':
        return asyncGenerateMaze(asyncBinaryTree);
      case "Randomized Kruskal's Algorithm":
        return asyncGenerateMaze(asyncRandomizedKruskalsAlgo);
      case 'Aldous-Broder Algorithm':
        return asyncGenerateMaze(asyncAldousBroderAlgo);
      case 'Open Grid':
        this.dropInteriorWalls();
        this.generateMazeEntryAndExit();
        return Promise.resolve(false);
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
        return asyncFindSolution(asyncDijkstrasAlgo);
      case 'A* Search':
        return asyncFindSolution(asyncAStarSearch);
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
        col.isVisited = true;
        const interiorWalls = {
          north: true,
          east: true,
          south: true,
          west: true,
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
        col.isToBeVisited = false;
        col.isExitColor = false;
        col.opacity = 0;
        col.parent = null;
        col.isInOpenList = false;
        col.isInClosedList = false;
        col.h = Infinity;
        col.f = Infinity;
      }
    }
  }

  draw(ctx) {
    for (const row of this.content) {
      for (const col of row) {
        col.draw(ctx, this.cellSize, this.cellColors, this.lineWidth);
      }
    }
  }
}

export default Grid;
