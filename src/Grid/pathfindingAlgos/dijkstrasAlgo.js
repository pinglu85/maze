import { delay } from '../../utils';
import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';

async function asyncDijkstrasAlgo(grid, entranceCell, exitCell, wait = 50) {
  await asyncDistance(grid, entranceCell, wait);
  const pathCoordinates = reconstructPath(exitCell);

  return Promise.resolve(pathCoordinates);
}

async function asyncDistance(grid, entranceCell, wait) {
  const frontiers = new PriorityQueue(
    (cellA, cellB) => cellA.distanceToEntrance - cellB.distanceToEntrance
  );
  frontiers.add(entranceCell);
  entranceCell.distanceToEntrance = 0;
  entranceCell.isToBeExplored = true;

  const visitedCells = new Set();

  while (frontiers.size() > 0) {
    await delay(wait);

    const cell = frontiers.poll();
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
        frontiers.add(neighbor);
        neighbor.isToBeExplored = true;
      }
    }
  }

  return Promise.resolve();
}

export default asyncDijkstrasAlgo;
