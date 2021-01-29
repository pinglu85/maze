import reconstructPath from './reconstructPath';
import { delay } from '../../utils';

function getNewFrontiers(grid, frontiers, resolve) {
  const newFrontiers = [];

  for (const cell of frontiers) {
    cell.isToBeExplored = false;
    cell.opacity = 0.01;

    const unvisitedConnectedNeighbors = cell
      .getConnectedNeighbors(grid)
      .filter((neighbor) => neighbor.distanceToEntrance === Infinity);

    for (const neighbor of unvisitedConnectedNeighbors) {
      neighbor.parent = cell;
      neighbor.distanceToEntrance = cell.distanceToEntrance + 1;
      if (neighbor.isExit) {
        neighbor.isExitColor = true;
        resolve([]);
        return;
      }
      neighbor.isToBeExplored = true;
    }

    newFrontiers.push(...unvisitedConnectedNeighbors);
  }

  resolve(newFrontiers);
}

function asyncGetNewFrontiers(grid, frontiers, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getNewFrontiers(grid, frontiers, resolve);
    }, wait);
  });
}

async function asyncDistance(grid, entranceCell, wait) {
  let frontiers = [entranceCell];
  entranceCell.distanceToEntrance = 0;

  while (frontiers.length) {
    frontiers = await asyncGetNewFrontiers(grid, frontiers, wait);
    await delay(wait);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
}

async function asyncDijkstrasAlgo(grid, entranceCell, exitCell, wait = 50) {
  await asyncDistance(grid, entranceCell, wait);
  const pathCoordinates = reconstructPath(exitCell);

  return Promise.resolve(pathCoordinates);
}

export default asyncDijkstrasAlgo;
