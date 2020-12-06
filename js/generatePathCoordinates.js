function generateCoordinates(dir, cell) {
  const { startX, startY, centerX, centerY, endX, endY } = cell;
  let x = 0;
  let y = 0;

  switch (dir) {
    case 'north':
      x = centerX;
      y = startY;
      break;
    case 'west':
      x = endX;
      y = centerY;
      break;
    case 'south':
      x = centerX;
      y = endY;
      break;
    case 'east':
      x = startX;
      y = centerY;
      break;
    default:
    // do nothing
  }

  return { x, y };
}

export default function generatePathCoordinates(path) {
  return path.map(({ cell, prevDir, nextDir }) => {
    const coordinates = {
      start: { x: 0, y: 0 },
      middle: { x: cell.centerX, y: cell.centerY },
      end: { x: 0, y: 0 }
    };

    const [startCoordinates, endCoordinates] = [prevDir, nextDir].map((dir) => {
      return generateCoordinates(dir, cell);
    });

    coordinates.start.x = startCoordinates.x;
    coordinates.start.y = startCoordinates.y;
    coordinates.end.x = endCoordinates.x;
    coordinates.end.y = endCoordinates.y;

    return { prevDir, nextDir, coordinates };
  });
}
