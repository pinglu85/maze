import { mazeAlgoSharedIcons } from './sharedIcons';
import { CELL_COLORS } from '../../constants/colors';

const randomizedKruskalsAlgo = {
  icons: [
    ...mazeAlgoSharedIcons,
    {
      label: 'Selected Neighbor',
      bgColor: CELL_COLORS.neighbor,
      borderColor: CELL_COLORS.border,
    },
    {
      label: 'unmergeable Neighbor',
      bgColor: CELL_COLORS.sameSet,
      borderColor: CELL_COLORS.border,
    },
    {
      label: 'mergeable Neighbor',
      bgColor: CELL_COLORS.differentSet,
      borderColor: CELL_COLORS.border,
    },
  ],
  text:
    "Randomized Kruskal's Algorithm produces very regular, uniform mazes and is largely unbiased.",
};

export default randomizedKruskalsAlgo;
