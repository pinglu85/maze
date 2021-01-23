import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { selectAlgo } from '../../store/actions';

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

const MazeAlgosDropdown = ({ store }) => {
  const handleClickItem = (e) => {
    const { isMazeGenerating, isSearchingSolution } = store.getState();
    if (isMazeGenerating || isSearchingSolution) {
      return;
    }

    store.dispatch(
      selectAlgo({ type: 'mazeAlgo', name: e.target.textContent })
    );
  };

  return (
    <Dropdown
      btnLabel="Maze Algorithms"
      items={items}
      handleClickItem={handleClickItem}
      subscribe={store.subscribe}
    />
  );
};

export default MazeAlgosDropdown;
