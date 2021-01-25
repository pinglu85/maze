export const CELL_SIZE = 32;
export const LINE_WIDTHS = {
  outerWall: 6,
  interiorWall: 4,
  get halfOuterInteriorWallDiff() {
    return Math.floor((this.outerWall - this.interiorWall) / 2);
  },
};
export const MIN_GRID_SIZE = 3;
export const MAX_GRID_SIZE = 40;
export const DEFAULT_GRID_SIZE = {
  mobile: { numOfRows: 8, numOfCols: 9 },
  tablet: { numOfRows: 15, numOfCols: 20 },
  bigTablet: { numOfRows: 15, numOfCols: 30 },
  desktop: { numOfRows: 13, numOfCols: 40 },
};

export const SPRITE_SIZE = 28;
export const FOOTPRINT_RADIUS = 5;
