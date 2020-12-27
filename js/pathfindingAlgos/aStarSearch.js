function computeManhattanDistance(currCell, goal) {
  return (
    Math.abs(currCell.colIndex - goal.colIndex) +
    Math.abs(currCell.rowIndex - goal.rowIndex)
  );
}

function reconstructPath(exitCell) {
  if (!exitCell.parent) {
    return [];
  }

  let breadcrumb = exitCell;
  const pathCoordinates = [];

  while (breadcrumb) {
    pathCoordinates.push([breadcrumb.centerX, breadcrumb.centerY]);
    breadcrumb = breadcrumb.parent;
  }

  return pathCoordinates;
}

function aStarSearch(grid, entranceCell, exitCell) {
  const openList = [entranceCell];
  const closedList = [];
  entranceCell.isInOpenList = true;
  entranceCell.g = 0;
  entranceCell.f = 0;

  while (openList.length > 0) {
    const q = openList.sort((cellA, cellB) => cellB.f - cellA.f).pop();
    q.isInOpenList = false;
    closedList.push(q);
    q.isInClosedList = true;

    const successors = q.getConnectedNeighbors(grid);

    for (const successor of successors) {
      if (successor.isInClosedList) {
        continue;
      }

      successor.parent = q;

      if (successor.isExit) {
        return reconstructPath(exitCell);
      }

      const newG = q.g + 1;
      const newH = computeManhattanDistance(successor, exitCell);
      const newF = newG + newH;

      if (successor.f > newF) {
        if (!successor.isInOpenList) {
          openList.push(successor);
        }
        successor.g = newG;
        successor.h = newH;
        successor.f = newF;
      }
    }
  }

  return [];
}

export default aStarSearch;
