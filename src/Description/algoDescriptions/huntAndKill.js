import { mazeAlgoSharedIcons } from './sharedIcons';
import { GRID_COLORS } from '../../constants/colors';

const huntAndKill = {
  icons: [
    ...mazeAlgoSharedIcons,
    {
      label: 'Scanned Cell',
      bgColor: GRID_COLORS.cell.scanned,
      borderColor: GRID_COLORS.cell.border,
    },
  ],
  text:
    'Hunt-and-Kill produces mazes that have long, twisty passages and relatively few dead ends.',
};

export default huntAndKill;
