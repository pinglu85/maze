import Cell from './Cell';
import * as mazeAlgos from './mazeAlgos';
import * as pathfindingAlgos from './pathfindingAlgos';
import { getRandomIndex, getStartOrEndIndexOfArray } from '../utils';
import { GRID_COLORS } from '../constants/colors';
import { CELL_SIZE, LINE_WIDTHS } from '../constants/size';

class Grid {
  constructor(cellSize, lineWidths, gridColors) {
    this.content = [];
    this.cellSize = cellSize;
    this.lineWidths = lineWidths;
    this.cellPosOffSet =
      Math.floor(this.lineWidths.outerWall / 2) +
      this.lineWidths.halfOuterInteriorWallDiff;
    this.gridColors = gridColors;
    this.entranceCell = null;
    this.entranceDir = '';
    this.exitCell = null;
    this.exitDir = '';
    this.isOpenGrid = false;
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

  async generateMaze(algoName) {
    if (algoName === 'OpenGrid' || algoName === 'RecursiveDivision') {
      this.#dropInteriorWalls();
    }

    if (algoName === 'OpenGrid') {
      this.isOpenGrid = true;
      this.#generateMazeEntryAndExit();
      return Promise.resolve();
    }

    const grid = this.content;
    this.isOpenGrid = false;

    if (algoName.startsWith('GrowingTree-')) {
      const optionStartIndex = 'GrowingTree-'.length;
      const option = algoName.slice(optionStartIndex);
      await mazeAlgos.asyncGrowingTree(grid, option);
    } else {
      const mazeAlgo = mazeAlgos[`async${algoName}`];
      await mazeAlgo(grid);
    }

    this.#generateMazeEntryAndExit();
    return Promise.resolve();
  }

  async findSolution(algoName) {
    const pathfindingAlgo = pathfindingAlgos[`async${algoName}`];
    const pathCoordinates = await pathfindingAlgo(
      this.content,
      this.entranceCell,
      this.exitCell
    );
    return Promise.resolve(pathCoordinates);
  }

  clearSolution() {
    for (const row of this.content) {
      for (const cell of row) {
        cell.resetStateForPathfinding();
      }
    }
  }

  draw = (ctx) => {
    if (this.isOpenGrid) {
      this.#drawGuides(ctx);
    }

    for (const row of this.content) {
      for (const cell of row) {
        cell.draw(ctx, this.cellSize, this.gridColors.cell, this.lineWidths);
      }
    }
  };

  toggleWeightedCell(rowIndex, colIndex) {
    const cell = this.content[rowIndex][colIndex];
    if (cell.isEntrance || cell.isExit) {
      return;
    }

    if (cell.weight === 1) {
      cell.resetStateForPathfinding();
      cell.weight = 20;
    } else {
      cell.weight = 1;
    }

    return cell;
  }

  #generateMazeEntryAndExit() {
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

  #dropInteriorWalls() {
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

  #drawGuides(ctx) {
    const numOfRows = this.content.length;
    const numOfCols = this.content[0].length;
    const width = numOfCols * this.cellSize + this.cellPosOffSet;
    const height = numOfRows * this.cellSize + this.cellPosOffSet;

    ctx.lineWidth = this.lineWidths.interiorWall;
    ctx.strokeStyle = this.gridColors.guides;

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

const grid = new Grid(CELL_SIZE, LINE_WIDTHS, GRID_COLORS);
export default grid;
