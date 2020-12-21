import { delay, resetCellsIsVisitingState } from './utils/index.js';

function getNewFrontiers(grid, frontiers, distance, resolve) {
  const newFrontiers = [];

  for (const cell of frontiers) {
    cell.isVisiting = false;
    cell.opacity = 0.01;

    const unvisitedConnectedNeighbors = cell
      .getConnectedNeighbors(grid)
      .filter((neighbor) => neighbor.distanceToEntrance === Infinity);

    for (const neighbor of unvisitedConnectedNeighbors) {
      neighbor.distanceToEntrance = distance;
      if (neighbor.isExit) {
        neighbor.isExitColor = true;
        resetCellsIsVisitingState(
          ...unvisitedConnectedNeighbors,
          ...newFrontiers,
          ...frontiers
        );
        resolve([]);
        return;
      }
      neighbor.isVisiting = true;
    }

    newFrontiers.push(...unvisitedConnectedNeighbors);
  }

  resolve(newFrontiers);
}

function asyncGetNewFrontiers(grid, frontiers, distance, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getNewFrontiers(grid, frontiers, distance, resolve);
    }, wait);
  });
}

async function asyncDistance(grid, entranceCell, wait) {
  let frontiers = [entranceCell];
  entranceCell.distanceToEntrance = 0;
  let distance = 1;

  while (frontiers.length) {
    frontiers = await asyncGetNewFrontiers(grid, frontiers, distance, wait);
    distance++;
    await delay(wait);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
}

function findPath(grid, exitCell) {
  if (exitCell.distanceToEntrance === Infinity) {
    return [];
  }

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
  await asyncDistance(content, entranceCell, wait);
  const pathCoordinates = findPath(content, exitCell);

  return Promise.resolve(pathCoordinates);
}

export default dijkstra;
