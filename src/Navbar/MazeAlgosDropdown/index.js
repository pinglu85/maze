import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { selectNewMazeAlgo } from '../../store/actions';

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

const MazeAlgosDropdown = ({ getState, dispatch, subscribe }) => {
  const handleClickItem = (e) => {
    const { isMazeGenerating, isSearchingSolution } = getState();
    if (isMazeGenerating || isSearchingSolution) {
      return;
    }

    const algo = e.target.textContent;
    dispatch(selectNewMazeAlgo(algo));
  };

  return (
    <Dropdown
      btnLabel="Maze Algorithms"
      items={items}
      handleClickItem={handleClickItem}
      subscribe={subscribe}
    />
  );
};

export default MazeAlgosDropdown;
