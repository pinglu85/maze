import Dropdown from '../../shared/Dropdown';
import store from '../../store';
import { selectNewMazeAlgo } from '../../store/actions';

const btnLabel = 'Maze Algorithms';
const items = [
  { text: 'Hunt-and-Kill' },
  { text: 'Recursive Backtracker' },
  { text: 'Recursive Division' },
  { text: 'Growing Tree (random)' },
  { text: 'Growing Tree (last)' },
  { text: 'Growing Tree (mix)' },
  { text: 'Binary Tree' },
  { text: "Randomized Kruskal's Algorithm" },
  { text: 'Aldous-Broder Algorithm' },
  { text: 'Open Grid', style: 'withBorderTop' },
];

const handleClickItem = (e) => {
  const { isMazeGenerating, isSearchingSolution } = store.getState();
  if (isMazeGenerating || isSearchingSolution) {
    return;
  }

  const algo = e.target.textContent;
  store.dispatch(selectNewMazeAlgo(algo));
};

const mazeAlgoDropdown = new Dropdown(btnLabel, items, handleClickItem);
export default mazeAlgoDropdown;
