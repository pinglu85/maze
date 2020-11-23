import getRandomIndex from '../utils/getRandomIndex.js';
import shuffleArray from '../utils/shuffleArray.js';

function walk(grid, cell) {
  const randomAvailNeighbor = cell.getRandomAvailNeighbor(grid);
  if (!randomAvailNeighbor) {
    return;
  }

  const [dir, neighbor] = randomAvailNeighbor;
  cell.dropEdge(dir);
  neighbor.isVisited = true;
  neighbor.dropOppositeEdge(dir);
  walk(grid, neighbor);
}

function hunt(grid) {
  let randomVisitedNeighbor;

  for (const i of shuffleArray(grid.length)) {
    for (const j of shuffleArray(grid[i].length)) {
      const cell = grid[i][j];
      if (cell.isVisited) {
        continue;
      }
      randomVisitedNeighbor = cell.getRandomVisitedNeighbor(grid);
      if (randomVisitedNeighbor) {
        const [dir, neighbor] = randomVisitedNeighbor;
        cell.isVisited = true;
        cell.dropEdge(dir);
        neighbor.dropOppositeEdge(dir);
        return cell;
      }
    }
  }

  if (!randomVisitedNeighbor) {
    return null;
  }
}

function huntAndKill(grid) {
  const randomRow = getRandomIndex(grid.length);
  const randomColumn = getRandomIndex(grid[0].length);
  let startCell = grid[randomRow][randomColumn];
  startCell.isVisited = true;

  const allCellsIsVisited = grid.every((row) =>
    row.every((col) => col.isVisited)
  );

  while (!allCellsIsVisited && startCell) {
    walk(grid, startCell);
    startCell = hunt(grid);
  }
}

export default huntAndKill;
