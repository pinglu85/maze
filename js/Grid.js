import Cell from './Cell.js';
import asyncHuntAndKill from './mazeGenerationAlgos/huntAndKill.js';
import getRandomIndex from './utils/getRandomIndex.js';

class Grid {
  constructor(width, height, cellSize) {
    this.content = Array(height)
      .fill(null)
      .map((_, rowIndex) =>
        Array.from(
          new Array(width),
          (_, colIndex) => new Cell(rowIndex, colIndex)
        )
      );
    this.cellSize = cellSize;
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
    const entry = {
      rowIndex: getRandomIndex(numOfRows),
      colIndex: null
    };
    const exit = {
      rowIndex: null,
      colIndex: null
    };
    if (entry.rowIndex === 0 || entry.rowIndex === numOfRows - 1) {
      entry.colIndex = getRandomIndex(numOfCols);
    } else {
      const availColIndices = [0, numOfCols - 1];
      const randomIndex = getRandomIndex(availColIndices.length);
      entry.colIndex = availColIndices[randomIndex];
    }

    exit.rowIndex = this.getOppositeSideIndex(entry.rowIndex, numOfRows);

    if (exit.rowIndex !== null) {
      exit.colIndex = getRandomIndex(numOfCols);
    } else {
      exit.colIndex = this.getOppositeSideIndex(entry.colIndex, numOfCols);
      exit.rowIndex = getRandomIndex(numOfRows);
    }

    this.content[entry.rowIndex][entry.colIndex].dropRandomBoundary(
      this.content
    );
    this.content[exit.rowIndex][exit.colIndex].dropRandomBoundary(this.content);
  }

  generateMaze(algo) {
    switch (algo) {
      case 'Hunt and Kill':
        return new Promise(async (resolve) => {
          const isGeneratingMaze = await asyncHuntAndKill(this.content);
          resolve(isGeneratingMaze);
        });
      default:
      // do nothing
    }
  }

  draw(ctx) {
    const cellSize = this.cellSize;
    for (let i = 0; i < this.content.length; i++) {
      for (let j = 0; j < this.content[i].length; j++) {
        this.content[i][j].draw(ctx, j * cellSize, i * cellSize, cellSize);
      }
    }
  }
}

export default Grid;
