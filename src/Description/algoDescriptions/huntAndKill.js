import { mazeAlgoSharedIcons } from './sharedIcons';
import { CELL_COLORS } from '../../constants/colors';

const huntAndKill = {
  icons: [
    ...mazeAlgoSharedIcons,
    {
      label: 'Scanned Cell',
      bgColor: CELL_COLORS.scanned,
      borderColor: CELL_COLORS.border,
    },
  ],
  text:
    'Hunt-and-Kill produces mazes that have long, twisty passages and relatively few dead ends.',
};

export default huntAndKill;
