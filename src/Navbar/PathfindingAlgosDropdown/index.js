import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { selectAlgo } from '../../store/actions';

const items = [{ text: "Dijkstra's Algorithm" }, { text: 'A* Search' }];

const PathfindingAlgosDropdown = ({ store }) => {
  const handleClickItem = (e) => {
    const { isMazeGenerating, isSearchingSolution } = store.getState();
    if (isMazeGenerating || isSearchingSolution) {
      return;
    }

    store.dispatch(
      selectAlgo({ algoType: 'pathfindingAlgo', name: e.target.textContent })
    );
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
