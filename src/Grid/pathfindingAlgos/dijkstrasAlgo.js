import reconstructPath from './reconstructPath';
import { delay } from '../../utils';

function getNewFrontiers(grid, frontiers, distance, resolve) {
  const newFrontiers = [];

  for (const cell of frontiers) {
    cell.isToBeExplored = false;
    cell.opacity = 0.01;

    const unvisitedConnectedNeighbors = cell
      .getConnectedNeighbors(grid)
      .filter((neighbor) => neighbor.distanceToEntrance === Infinity);

    for (const neighbor of unvisitedConnectedNeighbors) {
      neighbor.distanceToEntrance = distance;
      neighbor.parent = cell;
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

async function asyncDijkstrasAlgo(grid, entranceCell, exitCell, wait = 50) {
  await asyncDistance(grid, entranceCell, wait);
  const pathCoordinates = reconstructPath(exitCell);

  return Promise.resolve(pathCoordinates);
}

export default asyncDijkstrasAlgo;
