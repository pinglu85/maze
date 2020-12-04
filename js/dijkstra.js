import getOppositeDir from './utils/getOppositeDir.js';

function distance(grid, entranceCell) {
  let frontiers = [entranceCell];
  entranceCell.distanceToEntrance = 0;
  let distance = 1;

  while (frontiers.length) {
    const new_frontiers = [];
    frontiers.forEach((cell) => {
      const unvisitedConnectedNeighbors = cell
        .getConnectedNeighbors(grid)
        .map((neighbor) => neighbor[1])
        .filter((neighbor) => neighbor.distanceToEntrance === Infinity);

      unvisitedConnectedNeighbors.forEach((neighbor) => {
        neighbor.distanceToEntrance = distance;
      });

      new_frontiers.push(...unvisitedConnectedNeighbors);
    });

    frontiers = new_frontiers;
    distance++;
  }
}

function findPath(grid, exitCell, entranceDir, exitDir) {
  let current = exitCell;
  let distance = exitCell.distanceToEntrance;
  const path = [];

  while (distance >= 0) {
    distance--;

    const breadcumb = {
      cell: current,
      prevDir: '',
      nextDir: ''
    };

    let nextDir;
    if (!path.length) {
      nextDir = exitDir;
    } else {
      const nextCell = path[path.length - 1];
      nextDir = getOppositeDir(nextCell.prevDir);
    }

    breadcumb.nextDir = nextDir;

    if (distance < 0) {
      breadcumb.prevDir = entranceDir;
    } else {
      const [prevDir, prevBreadcumb] = current
        .getConnectedNeighbors(grid)
        .find((neighbor) => neighbor[1].distanceToEntrance === distance);

      breadcumb.prevDir = prevDir;
      current = prevBreadcumb;
    }
    path.push(breadcumb);
  }
  return path;
}

export default function dijkstra(grid) {
  const { content, entranceCell, entranceDir, exitCell, exitDir } = grid;
  distance(content, entranceCell);
  return findPath(content, exitCell, entranceDir, exitDir);
}
