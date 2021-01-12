import Grid from './Grid';
import StartNode from './StartNode';
import TargetNode from './TargetNode';
import { loadStartNodeSprites, loadTargetNodeSprites } from './utils';
import {
  CELL_COLORS,
  FOOTPRINT_COLORS,
  GUIDES_COLOR,
} from './constants/colors';
import {
  CELL_SIZE,
  SPRITE_SIZE,
  FOOTPRINT_RADIUS,
  LINE_WIDTHS,
} from './constants/size';

export const grid = new Grid(CELL_SIZE, CELL_COLORS, LINE_WIDTHS, GUIDES_COLOR);

const startNodeSprites = loadStartNodeSprites(10);
export const startNode = new StartNode(
  startNodeSprites,
  SPRITE_SIZE,
  FOOTPRINT_RADIUS,
  FOOTPRINT_COLORS
);

const targetNodeSprites = loadTargetNodeSprites('normal', 'white');
export const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);
