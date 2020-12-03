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

function pathTo(grid, exitCell, entranceDir, exitDir) {
  let current = exitCell;
  let distance = exitCell.distanceToEntrance;
  const path = [];

  while (distance >= 0) {
    distance--;

    const breadcumb = {
      cell: current,
      previousDir: '',
      nextDir: ''
    };

    let nextDir;
    if (!path.length) {
      nextDir = exitDir;
    } else {
      const nextCell = path[path.length - 1];
      nextDir = {
        north: 'south',
        west: 'east',
        south: 'north',
        east: 'west'
      }[nextCell.previousDir];
    }

    breadcumb.nextDir = nextDir;

    if (distance < 0) {
      breadcumb.previousDir = entranceDir;
    } else {
      const [previousDir, previousBreadcumb] = current
        .getConnectedNeighbors(grid)
        .find((neighbor) => neighbor[1].distanceToEntrance === distance);

      breadcumb.previousDir = previousDir;
      current = previousBreadcumb;
    }
    path.push(breadcumb);
  }
  return path.reverse();
}

export default function dijkstra(grid) {
  const { content, entranceCell, entranceDir, exitCell, exitDir } = grid;
  distance(content, entranceCell);
  return pathTo(content, exitCell, entranceDir, exitDir);
}
