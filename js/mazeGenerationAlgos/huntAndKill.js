import getRandomIndex from "../utils/getRandomIndex.js";

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

  for (const row of grid) {
    for (const col of row) {
      if (col.isVisited) {
        continue;
      }
      randomVisitedNeighbor = col.getRandomVisitedNeighbor(grid);
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
