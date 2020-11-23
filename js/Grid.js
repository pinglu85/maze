import Cell from "./Cell.js";
import huntAndKill from "./mazeGenerationAlgos/huntAndKill.js";

class Grid {
  constructor(width, height, cellSize) {
    this.content = Array(height)
      .fill(null)
      .map((_, rowIndex) =>
        Array(width)
          .fill(null)
          .map((_, colIndex) => new Cell(rowIndex, colIndex))
      );
    this.cellSize = cellSize;
  }

  generateMaze() {
    huntAndKill(this.content);
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
