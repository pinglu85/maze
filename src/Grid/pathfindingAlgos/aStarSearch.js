import reconstructPath from './utils/reconstructPath';

async function asyncAStarSearch(grid, entranceCell, exitCell, wait = 50) {
  const openList = [entranceCell];
  const closedList = [];
  entranceCell.isInOpenList = true;
  entranceCell.g = 0;
  entranceCell.f = 0;

  while (openList.length > 0) {
    await asyncGetSuccessors(grid, exitCell, openList, closedList, wait);
  }

  return reconstructPath(exitCell);
}

function asyncGetSuccessors(grid, exitCell, openList, closedList, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getSuccessors(grid, exitCell, openList, closedList, resolve);
    }, wait);
  });
}

function getSuccessors(grid, exitCell, openList, closedList, resolve) {
  const q = openList.sort((cellA, cellB) => cellB.f - cellA.f).pop();
  q.isInOpenList = false;
  closedList.push(q);
  q.isInClosedList = true;
  q.opacity = 0.8;

  const successors = q.getConnectedNeighbors(grid);

  for (const successor of successors) {
    if (successor.isInClosedList) {
      continue;
    }

    successor.parent = q;

    if (successor.isExit) {
      successor.isExitColor = true;
      openList.length = 0;
      resolve();
      return;
    }

    const newG = q.g + 1;
    const newH = computeManhattanDistance(successor, exitCell);
    const newF = newG + newH;

    if (successor.f > newF) {
      if (!successor.isInOpenList) {
        openList.push(successor);
        successor.isInOpenList = true;
      }
      successor.g = newG;
      successor.h = newH;
      successor.f = newF;
    }
  }

  resolve();
}

function computeManhattanDistance(currCell, goal) {
  return (
    Math.abs(currCell.colIndex - goal.colIndex) +
    Math.abs(currCell.rowIndex - goal.rowIndex)
  );
}

export default asyncAStarSearch;
