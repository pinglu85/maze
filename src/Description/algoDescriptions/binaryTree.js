import { mazeAlgoSharedIcons } from './sharedIcons';
import { CELL_COLORS } from '../../constants/colors';

const binaryTree = {
  icons: [
    ...mazeAlgoSharedIcons,
    {
      label: 'Connected Cell',
      bgColor: CELL_COLORS.connected,
      borderColor: CELL_COLORS.border,
    },
  ],
  text: 'Binary Tree produces mazes that have a very biased texture.',
};

export default binaryTree;
