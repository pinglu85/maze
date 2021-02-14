import { createElement } from '../../utils';
import Dropdown from '../Dropdown';
import { PATHFINDING_ALGO_IDS } from '../../constants/algoIds';

const algoNames = [
  {
    id: PATHFINDING_ALGO_IDS.dijkstrasAlgo,
    textContent: "Dijkstra's Algorithm",
  },
  { id: PATHFINDING_ALGO_IDS.aStarSearch, textContent: 'A* Search' },
];

const PathfindingAlgosDropdown = ({ store }) => {
  return (
    <Dropdown
      store={store}
      btnLabel="Pathfinding Algorithms"
      items={algoNames}
    />
  );
};

export default PathfindingAlgosDropdown;
