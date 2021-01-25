import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';
import { PATHFINDING_ALGO_IDS } from '../../constants/algoIds';

const items = [
  { id: PATHFINDING_ALGO_IDS.dijkstrasAlgo, text: "Dijkstra's Algorithm" },
  { id: PATHFINDING_ALGO_IDS.aStarSearch, text: 'A* Search' },
];

const PathfindingAlgosDropdown = ({ store }) => {
  return <Dropdown store={store} btnLabel="Solution" items={items} />;
};

export default PathfindingAlgosDropdown;
