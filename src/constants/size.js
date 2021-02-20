export const CELL_SIZE = 32;
export const LINE_WIDTHS = {
  outerWall: 6,
  interiorWall: 4,
  get halfOuterInteriorWallDiff() {
    return Math.floor((this.outerWall - this.interiorWall) / 2);
  },
  innerStrokeWidth: 4,
};
export const MIN_GRID_SIZE = 3;
export const MAX_GRID_SIZE = 40;
export const DEFAULT_GRID_SIZE = {
  mobile: { numOfRows: 8, numOfCols: 9 },
  tablet: { numOfRows: 15, numOfCols: 20 },
  bigTablet: { numOfRows: 15, numOfCols: 25 },
  desktop: { numOfRows: 12, numOfCols: 35 },
};

export const SPRITE_SIZE = 28;
export const FOOTPRINT_RADIUS = 6;
