import { mazeAlgoSharedIcons } from './sharedIcons';
import { GRID_COLORS } from '../../constants/colors';

const binaryTree = {
  icons: [
    ...mazeAlgoSharedIcons,
    {
      label: 'Connected Cell',
      bgColor: GRID_COLORS.cell.connected,
      borderColor: GRID_COLORS.cell.border,
    },
  ],
  text: 'Binary Tree produces mazes that have a very biased texture.',
};

export default binaryTree;
