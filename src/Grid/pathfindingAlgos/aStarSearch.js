import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';
import { delay } from '../../utils';

async function asyncAStarSearch(grid, entranceCell, exitCell, wait = 50) {
  const pq = new PriorityQueue((cellA, cellB) => cellA.fScore - cellB.fScore);
  pq.add(entranceCell);
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

      const newDistanceToEntrance = cell.distanceToEntrance + 1;
      const newHScore = computeManhattanDistance(neighbor, exitCell);
      const newFScore = newDistanceToEntrance + newHScore;

      if (newDistanceToEntrance < neighbor.distanceToEntrance) {
        neighbor.distanceToEntrance = newDistanceToEntrance;
        neighbor.hScore = newHScore;
        neighbor.fScore = newFScore;
        neighbor.parent = cell;
        if (!neighbor.isToBeExplored) {
          pq.add(neighbor);
          neighbor.isToBeExplored = true;
        }
      }
    }
  }

  return Promise.resolve([]);
}

function computeManhattanDistance(currCell, targetCell) {
  return (
    Math.abs(currCell.centerX - targetCell.centerX) +
    Math.abs(currCell.centerY - targetCell.centerY)
  );
}

export default asyncAStarSearch;
