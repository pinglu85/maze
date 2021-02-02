import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';

async function asyncDijkstrasAlgo(grid, entranceCell, exitCell, wait = 50) {
  const pq = new PriorityQueue(
    (cellA, cellB) => cellA.distanceToEntrance - cellB.distanceToEntrance
  );
  pq.add(entranceCell);
  entranceCell.isToBeExplored = true;
  entranceCell.distanceToEntrance = 0;

  const visitedCells = new Set();

  while (pq.size() > 0) {
    const cell = pq.poll();
    cell.isToBeExplored = false;

    if (cell.isExit) {
      cell.isExitColor = true;
      const pathCoordinates = reconstructPath(exitCell);
      return Promise.resolve(pathCoordinates);
    }

    visitedCells.add(cell);
    cell.opacity = 0.01;

    await asyncGetNeighbors(cell, pq, visitedCells, grid, wait);
  }

  return Promise.resolve([]);
}

function asyncGetNeighbors(cell, pq, visitedCells, grid, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getNeighbors(cell, pq, visitedCells, grid, resolve);
    }, wait);
  });
}

function getNeighbors(cell, pq, visitedCells, grid, resolve) {
  const connectedNeighbors = cell.getConnectedNeighbors(grid);

  for (const neighbor of connectedNeighbors) {
    if (visitedCells.has(neighbor)) {
      continue;
    }

    const newDistanceToEntrance = cell.distanceToEntrance + 1;
    if (newDistanceToEntrance < neighbor.distanceToEntrance) {
      neighbor.parent = cell;
      neighbor.distanceToEntrance = newDistanceToEntrance;
      if (!neighbor.isToBeExplored) {
        pq.add(neighbor);
        neighbor.isToBeExplored = true;
      }
    }
  }

  resolve();
}

export default asyncDijkstrasAlgo;
