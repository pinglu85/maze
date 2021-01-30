import reconstructPath from './utils/reconstructPath';
import PriorityQueue from './utils/PriorityQueue';

async function asyncDijkstrasAlgo(grid, entranceCell, exitCell, wait = 50) {
  await asyncDistance(grid, entranceCell, exitCell, wait);
  const pathCoordinates = reconstructPath(exitCell);

  return Promise.resolve(pathCoordinates);
}

async function asyncDistance(grid, entranceCell, exitCell, wait) {
  const frontiers = new PriorityQueue(
    (cellA, cellB) => cellA.distanceToEntrance - cellB.distanceToEntrance
  );
  frontiers.add(entranceCell);
  entranceCell.distanceToEntrance = 0;

  while (exitCell.distanceToEntrance === Infinity) {
    await asyncGetNewFrontiers(grid, frontiers, wait);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, wait);
  });
}

function asyncGetNewFrontiers(grid, frontiers, wait) {
  return new Promise((resolve) => {
    setTimeout(() => {
      getNewFrontiers(grid, frontiers, resolve);
    }, wait);
  });
}

function getNewFrontiers(grid, frontiers, resolve) {
  const cell = frontiers.poll();
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
      resolve();
      return;
    }
    frontiers.add(neighbor);
    neighbor.isToBeExplored = true;
  }

  resolve();
}

export default asyncDijkstrasAlgo;
