import startNodeSvg from '../../assets/start-node.svg';
import targetNodeSvg from '../../assets/target-node.svg';
import shortestPathSvg from '../../assets/shortest-path.svg';
import { GRID_COLORS } from '../../constants/colors';

const { cell: cellColors } = GRID_COLORS;

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
    bgColor: cellColors.visited,
    borderColor: cellColors.border,
  },
  {
    label: 'Unvisited Cell',
    bgColor: cellColors.unvisited,
    borderColor: cellColors.border,
  },

  {
    label: 'Current Starting Cell',
    bgColor: cellColors.starting,
    borderColor: cellColors.border,
  },
];

export const pathfindingAlgoSharedIcons = [
  startNodeIcon,
  targetNodeIcon,
  {
    label: 'Visited Cell',
    bgColor: cellColors.pathfinding.visited,
    borderColor: cellColors.border,
  },
  {
    label: 'Cell to Be Explored',
    bgColor: cellColors.pathfinding.toBeExplored,
    borderColor: cellColors.border,
  },
  {
    label: 'Shortest Path',
    bgColor: 'transparent',
    borderColor: 'transparent',
    svg: shortestPathSvg,
    iconSize: 'big',
  },
];
