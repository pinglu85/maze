import Cell from './Cell.js';
import asyncHuntAndKill from './mazeGenerationAlgos/huntAndKill.js';
import asyncRecursiveBacktracker from './mazeGenerationAlgos/recursiveBacktracker.js';
import binaryTree from './mazeGenerationAlgos/binaryTree.js';
import asyncAldousBroderAlgo from './mazeGenerationAlgos/aldousBroderAlgo.js';
import getRandomIndex from './utils/getRandomIndex.js';
import returnPromise from './utils/returnPromise.js';

class Grid {
  constructor(width, height, cellSize, cellColors) {
    this.content = Array.from(new Array(height), (_, rowIndex) =>
      Array.from(new Array(width), (_, colIndex) => {
        const cell = new Cell(rowIndex, colIndex, cellSize, cellColors);
        cell.setBoundaries(height, width);
        return cell;
      })
    );
    this.entranceCell = null;
    this.entranceDir = '';
    this.exitCell = null;
    this.exitDir = '';
  }

  getOppositeSideIndex(index, numOfItems) {
    switch (index) {
      case 0:
        return numOfItems - 1;
      case numOfItems - 1:
        return 0;
      default:
        return null;
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

    exit.rowIndex = this.getOppositeSideIndex(entrance.rowIndex, numOfRows);

    if (exit.rowIndex !== null) {
      exit.colIndex = getRandomIndex(numOfCols);
    } else {
      exit.colIndex = this.getOppositeSideIndex(entrance.colIndex, numOfCols);
      exit.rowIndex = getRandomIndex(numOfRows);
    }

    this.entranceCell = this.content[entrance.rowIndex][entrance.colIndex];
    this.entranceCell.isEntrance = true;
    this.exitCell = this.content[exit.rowIndex][exit.colIndex];
    this.exitCell.isExit = true;
    this.entranceDir = this.entranceCell.dropRandomBoundary();
    this.exitDir = this.exitCell.dropRandomBoundary();
  }

  generateMaze(algo) {
    switch (algo) {
      case 'Hunt and Kill':
        return returnPromise(asyncHuntAndKill, this.content);
      case 'Recursive Backtracker':
        return returnPromise(asyncRecursiveBacktracker, this.content);
      case 'Binary Tree':
        return returnPromise(binaryTree, this.content);
      case 'Aldous-Broder Algorithm':
        return returnPromise(asyncAldousBroderAlgo, this.content);
      default:
      // do nothing
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
}

export default Grid;
