import { delay, resetCellsIsVisitingState } from './utils/index.js';

function asyncGetNewFrontiers(grid, frontiers, distance, wait) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const newFrontiers = [];
      let unvisitedConnectedNeighbors;
      let isExitCellReached = false;

      for (const cell of frontiers) {
        cell.isVisiting = false;
        cell.opacity = 0.01;

        unvisitedConnectedNeighbors = cell
          .getConnectedNeighbors(grid)
          .filter((neighbor) => neighbor.distanceToEntrance === Infinity);

        for (const neighbor of unvisitedConnectedNeighbors) {
          neighbor.distanceToEntrance = distance;
          if (neighbor.isExit) {
            neighbor.isExitColor = true;
            isExitCellReached = true;
            break;
          }
          neighbor.isVisiting = true;
        }

        if (isExitCellReached) {
          break;
        }

        newFrontiers.push(...unvisitedConnectedNeighbors);
      }

      if (!isExitCellReached) {
        resolve(newFrontiers);
        return;
      }

      resetCellsIsVisitingState(
        ...unvisitedConnectedNeighbors,
        ...newFrontiers,
        ...frontiers
      );
      resolve([]);
    }, wait);
  });
}

function distance(grid, entranceCell, wait) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      let frontiers = [entranceCell];
      entranceCell.distanceToEntrance = 0;
      let distance = 1;

      while (frontiers.length) {
        frontiers = await asyncGetNewFrontiers(grid, frontiers, distance, wait);
        distance++;
        await delay(wait);
      }

      resolve();
    }, wait);
  });
}

function findPath(grid, exitCell) {
  let breadcrumb = exitCell;
  let distance = exitCell.distanceToEntrance;
  const pathCoordinates = [[breadcrumb.centerX, breadcrumb.centerY]];

  while (distance > 0) {
    distance--;

    breadcrumb = breadcrumb
      .getConnectedNeighbors(grid)
      .find((neighbor) => neighbor.distanceToEntrance === distance);

    pathCoordinates.push([breadcrumb.centerX, breadcrumb.centerY]);
  }
  return pathCoordinates;
}

async function dijkstra({ content, entranceCell, exitCell }, wait = 50) {
  await distance(content, entranceCell, wait);
  const pathCoordinates = findPath(content, exitCell);

  return Promise.resolve(pathCoordinates);
}

export default dijkstra;
