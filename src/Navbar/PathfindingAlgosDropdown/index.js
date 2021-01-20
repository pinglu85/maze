import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { selectNewPathfindingAlgo } from '../../store/actions';

const items = [{ text: "Dijkstra's Algorithm" }, { text: 'A* Search' }];

const PathfindingAlgosDropdown = ({ getState, dispatch, subscribe }) => {
  const handleClickItem = (e) => {
    const { isMazeGenerating, isSearchingSolution } = getState();
    if (isMazeGenerating || isSearchingSolution) {
      return;
    }

    const algo = e.target.textContent;
    dispatch(selectNewPathfindingAlgo(algo));
  };

  return (
    <Dropdown
      btnLabel="Solution"
      items={items}
      handleClickItem={handleClickItem}
      subscribe={subscribe}
    />
  );
};

export default PathfindingAlgosDropdown;
