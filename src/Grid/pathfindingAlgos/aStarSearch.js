import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';

async function asyncAStarSearch(grid, entranceCell, exitCell, wait = 50) {
  const pq = new PriorityQueue((cellA, cellB) => cellA.f - cellB.f);
  pq.add(entranceCell);
  entranceCell.isInOpenList = true;
  entranceCell.g = 0;
  entranceCell.f = 0;

  const closedList = [];

  while (pq.size() > 0) {
    const cell = pq.poll();
    cell.isInOpenList = false;

    if (cell.isExit) {
      cell.isExitColor = true;
      break;
    }

    closedList.push(cell);
    cell.isInClosedList = true;
    cell.opacity = 0.8;

    await asyncGetSuccessors(cell, grid, exitCell, pq, wait);
  }

  return reconstructPath(exitCell);
}

function asyncGetSuccessors(cell, grid, exitCell, openList, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getSuccessors(cell, grid, exitCell, openList, resolve);
    }, wait);
  });
}

function getSuccessors(cell, grid, exitCell, openList, resolve) {
  const successors = cell.getConnectedNeighbors(grid);

  for (const successor of successors) {
    if (successor.isInClosedList) {
      continue;
    }

    const newG = cell.g + 1;
    const newH = computeManhattanDistance(successor, exitCell);
    const newF = newG + newH;

    if (newF < successor.f) {
      successor.g = newG;
      successor.h = newH;
      successor.f = newF;
      successor.parent = cell;
      if (!successor.isInOpenList) {
        openList.add(successor);
        successor.isInOpenList = true;
      }
    }
  }

  resolve();
}

function computeManhattanDistance(currCell, goal) {
  return (
    Math.abs(currCell.centerX - goal.centerX) +
    Math.abs(currCell.centerY - goal.centerY)
  );
}

export default asyncAStarSearch;
