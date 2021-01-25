import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { MAZE_ALGO_IDS } from '../../constants/algoIds';

const items = [
  { id: MAZE_ALGO_IDS.huntAndKill, text: 'Hunt-and-Kill' },
  { id: MAZE_ALGO_IDS.recursiveBacktracker, text: 'Recursive Backtracker' },
  { id: MAZE_ALGO_IDS.recursiveDivision, text: 'Recursive Division' },
  { id: MAZE_ALGO_IDS.growingTreeRandom, text: 'Growing Tree (random)' },
  { id: MAZE_ALGO_IDS.growingTreeLast, text: 'Growing Tree (last)' },
  { id: MAZE_ALGO_IDS.growingTreeMix, text: 'Growing Tree (mix)' },
  { id: MAZE_ALGO_IDS.binaryTree, text: 'Binary Tree' },
  {
    id: MAZE_ALGO_IDS.randomizedKruskalsAlgo,
    text: "Randomized Kruskal's Algorithm",
  },
  { id: MAZE_ALGO_IDS.aldousBroderAlgo, text: 'Aldous-Broder Algorithm' },
  { id: MAZE_ALGO_IDS.openGrid, text: 'Open Grid', style: 'withBorderTop' },
];

const MazeAlgosDropdown = ({ store }) => {
  return <Dropdown store={store} btnLabel="Maze Algorithms" items={items} />;
};

export default MazeAlgosDropdown;
