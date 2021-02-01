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

    await asyncGetSuccessors(cell, pq, visitedCells, grid, exitCell, wait);
  }

  return Promise.resolve([]);
}

function asyncGetSuccessors(cell, pq, visitedCells, grid, exitCell, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getSuccessors(cell, pq, visitedCells, grid, exitCell, resolve);
    }, wait);
  });
}

function getSuccessors(cell, pq, visitedCells, grid, exitCell, resolve) {
  const successors = cell.getConnectedNeighbors(grid);

  for (const successor of successors) {
    if (visitedCells.has(successor)) {
      continue;
    }

    const newDistanceToEntrance = cell.distanceToEntrance + 1;
    const newH = computeManhattanDistance(successor, exitCell);
    const newF = newDistanceToEntrance + newH;

    if (newDistanceToEntrance < successor.distanceToEntrance) {
      successor.distanceToEntrance = newDistanceToEntrance;
      successor.h = newH;
      successor.f = newF;
      successor.parent = cell;
      if (!successor.isToBeExplored) {
        pq.add(successor);
        successor.isToBeExplored = true;
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
