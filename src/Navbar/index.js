import mazeAlgoDropdown from './MazeAlgoDropdown';
import pathfindingDropdown from './PathfindingAlgoDropdown';
import settingsDrawer from '../SettingsDrawer';
import store from '../store';
import logo from '../assets/logo.svg';
import settingsIcon from '../assets/settings.svg';
import styles from './style.module.css';

class Navbar {
  constructor() {
    this._root = document.getElementById('header');
    this._root.innerHTML = this._template();

    this._mainControls = this._root.querySelector('#nav-main-controls');
    this._mainControls.appendChild(mazeAlgoDropdown.root);
    this._mainControls.appendChild(pathfindingDropdown.root);

    this.mazeAlgoMenu = mazeAlgoDropdown.menu;
    this.pathfindingAlgoMenu = pathfindingDropdown.menu;

    this._settingsBtn = this._root.querySelector('#settings-btn');
    this._settingsBtn.addEventListener('click', this._handleSettingsBtnClick);
  }

  _handleSettingsBtnClick() {
    const { gridSize } = store.getState();
    settingsDrawer.open(gridSize, store.dispatch);
  }

  _template() {
    return `
      <nav class="${styles.navbar}">
        <a href="./" class="${styles.logo}">
          ${logo}
        </a>
        <div class="${styles.controls}">
          <div class="${styles.controlsMain}" id="nav-main-controls"></div>
          <button type="button" class="btn ${styles.btnSettings}" id="settings-btn">
            ${settingsIcon}
            <span class="sr-only">Settings</span>
          </button>
        </div>
      </nav>
    `;
  }
}

const navbar = new Navbar();
export default navbar;
