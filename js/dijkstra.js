function distance(grid, entranceCell) {
  let frontiers = [entranceCell];
  entranceCell.distanceToEntrance = 0;
  let distance = 1;

  while (frontiers.length) {
    const new_frontiers = [];
    frontiers.forEach((cell) => {
      const unvisitedConnectedNeighbors = cell
        .getConnectedNeighbors(grid)
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

function findPath(grid, exitCell) {
  let breadcumb = exitCell;
  let distance = exitCell.distanceToEntrance;
  const pathCoordinates = [[breadcumb.centerX, breadcumb.centerY]];

  while (distance > 0) {
    distance--;

    breadcumb = breadcumb
      .getConnectedNeighbors(grid)
      .find((neighbor) => neighbor.distanceToEntrance === distance);

    console.log(breadcumb);
    pathCoordinates.push([breadcumb.centerX, breadcumb.centerY]);
  }
  return pathCoordinates;
}

export default function dijkstra({ content, entranceCell, exitCell }) {
  distance(content, entranceCell);
  return findPath(content, exitCell);
}
