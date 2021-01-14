import siteLogo from './SiteLogo';
import navItemsWrapper from './NavItemsWrapper';
import mazeAlgoDropdown from './DropdownsWrapper/MazeAlgoDropdown';
import pathfindingDropdown from './DropdownsWrapper/PathfindingAlgoDropdown';
import { createDOMElement } from '../utils';
import styles from './style.module.css';

class Navbar {
  constructor(root, mazeAlgoDropdown, pathfindingDropdown) {
    this._root = root;
    this.mazeAlgoMenu = mazeAlgoDropdown;
    this.pathfindingAlgoMenu = pathfindingDropdown;
  }

  appendToRoot(...children) {
    const navbar = createDOMElement({
      el: 'nav',
      classes: [styles.navbar],
      children,
    });
    this._root.appendChild(navbar);
  }
}

const root = document.getElementById('header');
const navbar = new Navbar(
  root,
  mazeAlgoDropdown.menu,
  pathfindingDropdown.menu
);
navbar.appendToRoot(siteLogo, navItemsWrapper);

export default navbar;
