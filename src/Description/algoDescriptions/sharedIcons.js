import startNodeSvg from '../../assets/start-node.svg';
import targetNodeSvg from '../../assets/target-node.svg';
import shortestPathSvg from '../../assets/shortest-path.svg';
import { CELL_COLORS } from '../../constants/colors';

export const startNodeIcon = {
  label: 'Start Node',
  bgColor: 'transparent',
  borderColor: 'transparent',
  svg: startNodeSvg,
};

export const targetNodeIcon = {
  label: 'Target Node',
  bgColor: 'transparent',
  borderColor: 'transparent',
  svg: targetNodeSvg,
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
    label: 'Cell to Be Explored',
    bgColor: CELL_COLORS.pathfinding.toBeExplored,
    borderColor: CELL_COLORS.border,
  },
  {
    label: 'Shortest Path',
    bgColor: 'transparent',
    borderColor: 'transparent',
    svg: shortestPathSvg,
    iconSize: 'big',
  },
];
