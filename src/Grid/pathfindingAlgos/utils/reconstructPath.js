function reconstructPath(exitCell) {
  if (!exitCell.parent) {
    return [];
  }

  let breadcrumb = exitCell;
  const pathCoordinates = [];

  while (breadcrumb) {
    pathCoordinates.push([breadcrumb.centerX, breadcrumb.centerY]);
    breadcrumb = breadcrumb.parent;
  }

  return pathCoordinates;
}

export default reconstructPath;
