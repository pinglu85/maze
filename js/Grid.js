import Cell from './Cell.js';
import huntAndKill from './mazeGenerationAlgos/huntAndKill.js';

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

  generateMaze(algo) {
    switch (algo) {
      case 'Hunt and Kill':
        huntAndKill(this.content);
        break;
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
