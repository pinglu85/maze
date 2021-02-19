import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';
import { delay } from '../../utils';

async function asyncAStarSearch(grid, entranceCell, exitCell, wait = 50) {
  const pq = new PriorityQueue((cellA, cellB) => {
    if (cellA.fScore !== cellB.fScore) {
      return cellA.fScore - cellB.fScore;
    }

    return cellA.hScore - cellB.hScore;
  });

  pq.insert(entranceCell);
  entranceCell.isToBeExplored = true;
  entranceCell.distanceToEntrance = 0;
  entranceCell.fScore = 0;

  const visitedCells = new Set();

  while (pq.size() > 0) {
    const cell = pq.pull();
    await delay(wait);
    cell.isToBeExplored = false;

    if (cell.isExit) {
      cell.isExitColor = true;
      const pathCoordinates = reconstructPath(exitCell);
      return Promise.resolve(pathCoordinates);
    }

    visitedCells.add(cell);
    const connectedNeighbors = cell.getConnectedNeighbors(grid);

    for (const neighbor of connectedNeighbors) {
      if (visitedCells.has(neighbor)) {
        continue;
      }

      const newDistanceToEntrance = cell.distanceToEntrance + neighbor.weight;
      const newHScore = computeManhattanDistance(neighbor, exitCell);
      const newFScore = newDistanceToEntrance + newHScore;

      if (newDistanceToEntrance < neighbor.distanceToEntrance) {
        neighbor.distanceToEntrance = newDistanceToEntrance;
        neighbor.hScore = newHScore;
        neighbor.fScore = newFScore;
        neighbor.parent = cell;
        if (!neighbor.isToBeExplored) {
          pq.insert(neighbor);
          neighbor.isToBeExplored = true;
        }
      }
    }
  }

  return Promise.resolve([]);
}

function computeManhattanDistance(currCell, targetCell) {
  return (
    Math.abs(currCell.rowIndex - targetCell.rowIndex) +
    Math.abs(currCell.colIndex - targetCell.colIndex)
  );
}

export default asyncAStarSearch;
