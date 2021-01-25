import { createElement } from '../../utils';
import Dropdown from '../../shared/Dropdown';

const items = [{ text: "Dijkstra's Algorithm" }, { text: 'A* Search' }];

const PathfindingAlgosDropdown = ({ store }) => {
  return <Dropdown store={store} btnLabel="Solution" items={items} />;
};

export default PathfindingAlgosDropdown;
