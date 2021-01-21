import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { selectNewPathfindingAlgo } from '../../store/actions';

const items = [{ text: "Dijkstra's Algorithm" }, { text: 'A* Search' }];

const PathfindingAlgosDropdown = ({ store }) => {
  const handleClickItem = (e) => {
    const { isMazeGenerating, isSearchingSolution } = store.getState();
    if (isMazeGenerating || isSearchingSolution) {
      return;
    }

    const algo = e.target.textContent;
    store.dispatch(selectNewPathfindingAlgo(algo));
  };

  return (
    <Dropdown
      btnLabel="Solution"
      items={items}
      handleClickItem={handleClickItem}
      subscribe={store.subscribe}
    />
  );
};

export default PathfindingAlgosDropdown;
