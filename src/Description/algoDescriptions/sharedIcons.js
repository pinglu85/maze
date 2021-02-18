import startNodeSvg from '../../assets/start-node.svg';
import targetNodeSvg from '../../assets/target-node.svg';
import weightSvg from '../../assets/weight.svg';
import cellToBeExploredSvg from '../../assets/cellToBeExplored.svg';
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

const pathfindingAlgoSharedIcons = [
  {
    label: 'Visited Cell',
    bgColor: cellColors.pathfinding.visited,
    borderColor: cellColors.border,
  },
  {
    label: 'Cell to Be Explored',
    bgColor: 'transparent',
    svg: cellToBeExploredSvg,
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

export const weightedPathfindingAlgosSharedIcons = [
  startNodeIcon,
  targetNodeIcon,
  {
    label: 'Weighted Cell',
    bgColor: 'transparent',
    borderColor: cellColors.border,
    svg: weightSvg,
  },
  ...pathfindingAlgoSharedIcons,
];

export const unweightedPathfindingAlgosShareIcons = [
  startNodeIcon,
  targetNodeIcon,
  ...pathfindingAlgoSharedIcons,
];
