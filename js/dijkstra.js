import delay from './utils/delay.js';

function asyncGetNewFroniters(grid, frontiers, distance, wait) {
  return new Promise((resolve) => {
    setTimeout(async () => {
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
            resolve([]);
            return;
          }
          neighbor.isVisiting = true;
        }

        newFrontiers.push(...unvisitedConnectedNeighbors);
      }

      resolve(newFrontiers);
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
        frontiers = await asyncGetNewFroniters(grid, frontiers, distance, wait);
        distance++;
        await delay(wait);
      }

      resolve();
    }, wait);
  });
}

function findPath(grid, exitCell) {
  let breadcumb = exitCell;
  let distance = exitCell.distanceToEntrance;
  const pathCoordinates = [[breadcumb.centerX, breadcumb.centerY]];

  while (distance > 0) {
    distance--;

    breadcumb = breadcumb
      .getConnectedNeighbors(grid)
      .find((neighbor) => neighbor.distanceToEntrance === distance);

    pathCoordinates.push([breadcumb.centerX, breadcumb.centerY]);
  }
  return pathCoordinates;
}

export default function dijkstra(
  { content, entranceCell, exitCell },
  wait = 50
) {
  return new Promise(async (resolve) => {
    await distance(content, entranceCell, wait);
    resolve(findPath(content, exitCell));
  });
}
