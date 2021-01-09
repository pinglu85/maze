export const CELL_SIZE = 32;
export const SPRITE_SIZE = 28;
export const MIN_GRID_SIZE = 3;
export const MAX_GRID_SIZE = 40;
export const LINE_WIDTHS = {
  outerWall: 6,
  interiorWall: 4,
  get halfOuterInteriorWallDiff() {
    return Math.floor((this.outerWall - this.interiorWall) / 2);
  },
};
