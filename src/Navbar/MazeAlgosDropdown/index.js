import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { MAZE_ALGO_IDS } from '../../constants/algoIds';

const algoNames = [
  { id: MAZE_ALGO_IDS.huntAndKill, textContent: 'Hunt-and-Kill' },
  {
    id: MAZE_ALGO_IDS.recursiveBacktracker,
    textContent: 'Recursive Backtracker',
  },
  { id: MAZE_ALGO_IDS.recursiveDivision, textContent: 'Recursive Division' },
  { id: MAZE_ALGO_IDS.growingTreeRandom, textContent: 'Growing Tree (random)' },
  { id: MAZE_ALGO_IDS.growingTreeLast, textContent: 'Growing Tree (last)' },
  { id: MAZE_ALGO_IDS.growingTreeMix, textContent: 'Growing Tree (mix)' },
  { id: MAZE_ALGO_IDS.binaryTree, textContent: 'Binary Tree' },
  {
    id: MAZE_ALGO_IDS.randomizedKruskalsAlgo,
    textContent: "Randomized Kruskal's Algorithm",
  },
  {
    id: MAZE_ALGO_IDS.aldousBroderAlgo,
    textContent: 'Aldous-Broder Algorithm',
  },
  {
    id: MAZE_ALGO_IDS.openGrid,
    textContent: 'Open Grid',
    style: 'withBorderTop',
  },
];

const MazeAlgosDropdown = ({ store }) => {
  return (
    <Dropdown store={store} btnLabel="Maze Algorithms" items={algoNames} />
  );
};

export default MazeAlgosDropdown;
