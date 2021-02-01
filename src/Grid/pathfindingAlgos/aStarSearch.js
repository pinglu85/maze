import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';

async function asyncAStarSearch(grid, entranceCell, exitCell, wait = 50) {
  const pq = new PriorityQueue((cellA, cellB) => cellA.f - cellB.f);
  pq.add(entranceCell);
  entranceCell.isToBeExplored = true;
  entranceCell.distanceToEntrance = 0;
  entranceCell.f = 0;

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
    cell.opacity = 0.8;

    await asyncGetNeighbors(cell, pq, visitedCells, grid, exitCell, wait);
  }

  return Promise.resolve([]);
}

function asyncGetNeighbors(cell, pq, visitedCells, grid, exitCell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getNeighbors(cell, pq, visitedCells, grid, exitCell, resolve);
    }, wait);
  });
}

function getNeighbors(cell, pq, visitedCells, grid, exitCell, resolve) {
  const connectedNeighbors = cell.getConnectedNeighbors(grid);

  for (const neighbor of connectedNeighbors) {
    if (visitedCells.has(neighbor)) {
      continue;
    }

    const newDistanceToEntrance = cell.distanceToEntrance + 1;
    const newH = computeManhattanDistance(neighbor, exitCell);
    const newF = newDistanceToEntrance + newH;

    if (newDistanceToEntrance < neighbor.distanceToEntrance) {
      neighbor.distanceToEntrance = newDistanceToEntrance;
      neighbor.h = newH;
      neighbor.f = newF;
      neighbor.parent = cell;
      if (!neighbor.isToBeExplored) {
        pq.add(neighbor);
        neighbor.isToBeExplored = true;
      }
    }
  }

  resolve();
}

function computeManhattanDistance(currCell, targetCell) {
  return (
    Math.abs(currCell.centerX - targetCell.centerX) +
    Math.abs(currCell.centerY - targetCell.centerY)
  );
}

export default asyncAStarSearch;
