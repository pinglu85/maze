import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';
import { delay } from '../../utils';

async function asyncDijkstrasAlgo(grid, entranceCell, exitCell, wait = 50) {
  const pq = new PriorityQueue(
    (cellA, cellB) => cellA.distanceToEntrance < cellB.distanceToEntrance
  );
  pq.insert(entranceCell);
  entranceCell.isToBeExplored = true;
  entranceCell.distanceToEntrance = 0;

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
      if (newDistanceToEntrance < neighbor.distanceToEntrance) {
        neighbor.parent = cell;
        neighbor.distanceToEntrance = newDistanceToEntrance;
        if (!neighbor.isToBeExplored) {
          pq.insert(neighbor);
          neighbor.isToBeExplored = true;
        }
      }
    }
  }

  return Promise.resolve([]);
}

export default asyncDijkstrasAlgo;
