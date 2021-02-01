import { delay } from '../../utils';
import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';

async function asyncDijkstrasAlgo(grid, entranceCell, exitCell, wait = 50) {
  await asyncComputeDistances(grid, entranceCell, wait);
  const pathCoordinates = reconstructPath(exitCell);

  return Promise.resolve(pathCoordinates);
}

async function asyncComputeDistances(grid, entranceCell, wait) {
  const pq = new PriorityQueue(
    (cellA, cellB) => cellA.distanceToEntrance - cellB.distanceToEntrance
  );
  pq.add(entranceCell);
  entranceCell.distanceToEntrance = 0;
  entranceCell.isToBeExplored = true;

  const visitedCells = new Set();

  while (pq.size() > 0) {
    await delay(wait);

    const cell = pq.poll();
    cell.isToBeExplored = false;

    if (cell.isExit) {
      cell.isExitColor = true;
      return Promise.resolve();
    }

    if (visitedCells.has(cell)) {
      continue;
    }

    visitedCells.add(cell);
    cell.opacity = 0.01;

    const connectedNeighbors = cell.getConnectedNeighbors(grid);

    for (const neighbor of connectedNeighbors) {
      if (visitedCells.has(neighbor)) {
        continue;
      }

      const newDistanceToEntrance = cell.distanceToEntrance + 1;
      if (newDistanceToEntrance < neighbor.distanceToEntrance) {
        neighbor.parent = cell;
        neighbor.distanceToEntrance = newDistanceToEntrance;
        pq.add(neighbor);
        neighbor.isToBeExplored = true;
      }
    }
  }

  return Promise.resolve();
}

export default asyncDijkstrasAlgo;
