import mazeAlgoDropdown from './MazeAlgoDropdown';
import pathfindingDropdown from './PathfindingAlgoDropdown';
import { createDOMElement } from '../../utils';
import styles from './style.module.css';

const dropdownsWrapper = createDOMElement({
  el: 'div',
  classes: [styles.dropdownsWrapper],
  children: [mazeAlgoDropdown.root, pathfindingDropdown.root],
});

export default dropdownsWrapper;
