function generateCoordinates(dir, cellSize, startX, startY, centerX, centerY) {
  let x = 0;
  let y = 0;

  switch (dir) {
    case 'north':
      x = centerX;
      y = startY;
      break;
    case 'west':
      x = startX + cellSize;
      y = centerY;
      break;
    case 'south':
      x = centerX;
      y = startY + cellSize;
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
    const cellSize = cell.cellSize;
    const halfCellSize = cellSize / 2;
    const startX = cell.colIndex * cellSize;
    const startY = cell.rowIndex * cellSize;
    const centerX = startX + halfCellSize;
    const centerY = startY + halfCellSize;

    const coordinates = {
      start: { x: 0, y: 0 },
      middle: { x: centerX, y: centerY },
      end: { x: 0, y: 0 }
    };

    const [startCoordinates, endCoordinates] = [prevDir, nextDir].map((dir) => {
      return generateCoordinates(
        dir,
        cellSize,
        startX,
        startY,
        centerX,
        centerY
      );
    });

    coordinates.start.x = startCoordinates.x;
    coordinates.start.y = startCoordinates.y;
    coordinates.end.x = endCoordinates.x;
    coordinates.end.y = endCoordinates.y;

    return { prevDir, nextDir, coordinates };
  });
}
