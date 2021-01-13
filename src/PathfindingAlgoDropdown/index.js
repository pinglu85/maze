import Dropdown from '../shared/Dropdown';
import store from '../store';
import { selectNewPathfindingAlgo } from '../store/actions';

const root = document.getElementById('pathfinding-algo-dropdown');
const btnLabel = 'Solution';
const items = [{ text: "Dijkstra's Algorithm" }, { text: 'A&#42; Search' }];

const handleClickItem = (e) => {
  const { isMazeGenerating, isSearchingSolution } = store.getState();
  if (isMazeGenerating || isSearchingSolution) {
    return;
  }

  const algo = e.target.textContent;
  store.dispatch(selectNewPathfindingAlgo(algo));
};

const pathfindingAlgoDropdown = new Dropdown(
  root,
  btnLabel,
  items,
  handleClickItem
);

export default pathfindingAlgoDropdown;
