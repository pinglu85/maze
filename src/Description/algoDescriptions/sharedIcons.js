import startNodeIconSrc from '../../assets/start-node.svg';
import targetNodeIconSrc from '../../assets/target-node.svg';
import { CELL_COLORS } from '../../constants/colors';

export const startNodeIcon = {
  label: 'Start Node',
  bgColor: 'transparent',
  borderColor: 'transparent',
  iconSrc: startNodeIconSrc,
};

export const targetNodeIcon = {
  label: 'Target Node',
  bgColor: 'transparent',
  borderColor: 'transparent',
  iconSrc: targetNodeIconSrc,
};

export const mazeAlgoSharedIcons = [
  startNodeIcon,
  targetNodeIcon,
  {
    label: 'Visited Cell',
    bgColor: CELL_COLORS.visited,
    borderColor: CELL_COLORS.border,
  },
  {
    label: 'Unvisited Cell',
    bgColor: CELL_COLORS.unvisited,
    borderColor: CELL_COLORS.border,
  },

  {
    label: 'Current Starting Cell',
    bgColor: CELL_COLORS.starting,
    borderColor: CELL_COLORS.border,
  },
];

export const pathfindingAlgoSharedIcons = [
  startNodeIcon,
  targetNodeIcon,
  {
    label: 'Visited Cell',
    bgColor: CELL_COLORS.pathfinding.visited,
    borderColor: CELL_COLORS.border,
  },
  {
    label: 'To Be Explored Cell',
    bgColor: CELL_COLORS.pathfinding.toBeVisited,
    borderColor: CELL_COLORS.border,
  },
];
