import Cell from './Cell.js';
import getRandomIndex from './utils/getRandomIndex.js';

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

  walk(cell) {
    const randomAvailNeighbor = cell.getRandomAvailNeighbor(this.content);
    if (!randomAvailNeighbor) {
      return;
    }

    const [dir, neighbor] = randomAvailNeighbor;
    cell.dropEdge(dir);
    neighbor.isVisited = true;
    neighbor.dropOppositeEdge(dir);
    this.walk(neighbor);
  }

  hunt() {
    let randomVisitedNeighbor;

    for (const row of this.content) {
      for (const col of row) {
        if (col.isVisited) {
          continue;
        }
        randomVisitedNeighbor = col.getRandomVisitedNeighbor(this.content);
        if (randomVisitedNeighbor) {
          const [dir, neighbor] = randomVisitedNeighbor;
          col.isVisited = true;
          col.dropEdge(dir);
          neighbor.dropOppositeEdge(dir);
          return col;
        }
      }
    }

    if (!randomVisitedNeighbor) {
      return null;
    }
  }

  generateMaze() {
    const randomRow = getRandomIndex(this.content.length);
    const randomColumn = getRandomIndex(this.content[0].length);
    let startCell = this.content[randomRow][randomColumn];
    startCell.isVisited = true;

    const allCellsIsVisited = this.content.every((row) =>
      row.every((col) => col.isVisited)
    );

    while (!allCellsIsVisited && startCell) {
      this.walk(startCell);
      startCell = this.hunt();
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
