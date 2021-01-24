import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { selectAlgo } from '../../store/actions';

const items = [{ text: "Dijkstra's Algorithm" }, { text: 'A* Search' }];

const PathfindingAlgosDropdown = ({ store }) => {
  const handleClickItem = (e) => {
    const { isMazeGenerating, isSearchingForSolution, algo } = store.getState();
    if (isMazeGenerating || isSearchingForSolution) {
      return;
    }

    const newAlgo = e.target.textContent;
    if (newAlgo === algo.name) {
      return;
    }

    store.dispatch(selectAlgo({ algoType: 'pathfindingAlgo', name: newAlgo }));
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
