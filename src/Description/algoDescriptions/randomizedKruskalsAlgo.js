import { mazeAlgoSharedIcons } from './sharedIcons';
import { GRID_COLORS } from '../../constants/colors';

const { cell: cellColors } = GRID_COLORS;

const randomizedKruskalsAlgo = {
  icons: [
    ...mazeAlgoSharedIcons,
    {
      label: 'Selected Neighbor',
      bgColor: cellColors.neighbor,
      borderColor: cellColors.border,
    },
    {
      label: 'unmergeable Neighbor',
      bgColor: cellColors.sameSet,
      borderColor: cellColors.border,
    },
    {
      label: 'mergeable Neighbor',
      bgColor: cellColors.differentSet,
      borderColor: cellColors.border,
    },
  ],
  text:
    "Randomized Kruskal's Algorithm produces very regular, uniform mazes and is largely unbiased.",
};

export default randomizedKruskalsAlgo;
