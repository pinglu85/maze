import parseInputValue from './parseInputValue';
import { checkIsMobile, checkIsTablet, checkIsBigTablet } from '../utils';
import {
  GRID_SIZE_MOBILE,
  GRID_SIZE_TABLET,
  GRID_SIZE_BIG_TABLET,
  GRID_SIZE_DESKTOP,
} from '../constants/localStorageKeys';
import alertIcon from '../assets/alert-circle.svg';
import styles from './style.module.css';

class SettingsDrawer {
  constructor() {
    this._root = document.getElementById('settings-drawer');
    this._root.innerHTML = this._template();
    this._backdrop = document.getElementById('backdrop');
    this._inputRows = document.getElementById('rows');
    this._inputCols = document.getElementById('cols');
    this._dismissBtn = document.getElementById('drawer-dismiss-btn');
    this._saveBtn = document.getElementById('save-settings-btn');
    this._warningRoot = document.getElementById('drawer-warning');
  }

  open(gridSize, canvasSize, setCanvasesSize, grid, mazeCtx, mazeStates) {
    this._root.classList.add('is-open');
    this._backdrop.classList.add('is-active');

    this._setInputsValue(gridSize);
    setTimeout(() => {
      this._inputRows.focus();
    }, 200);

    this._dismissBtn.addEventListener('click', this._close);

    [this._inputRows, this._inputCols].forEach((input) =>
      input.addEventListener('input', this._onInputChange)
    );

    if (mazeStates.isGenerating || mazeStates.isSearchingSolution) {
      this._saveBtn.disabled = true;
      return;
    }

    this._saveBtn.addEventListener(
      'click',
      this._saveSettings.bind(
        this,
        gridSize,
        canvasSize,
        setCanvasesSize,
        grid,
        mazeCtx,
        mazeStates
      )
    );
  }

  _close = () => {
    this._root.classList.remove('is-open');
    this._backdrop.classList.remove('is-active');

    [this._inputRows, this._inputCols].forEach((input) =>
      input.removeEventListener('input', this._onInputChange)
    );

    this._dismissBtn.removeEventListener('click', this._close);
    this._saveBtn.removeEventListener('click', this._saveSettings);

    this._clearWarning();
  };

  _setInputsValue(gridSize) {
    this._inputRows.value = gridSize.numOfRows;
    this._inputCols.value = gridSize.numOfCols;
  }

  _onInputChange = (e) => {
    if (e.target.id === 'rows') {
      this._inputRows.value = e.target.value;
    } else {
      this._inputCols.value = e.target.value;
    }
  };

  _saveSettings(
    gridSize,
    canvasSize,
    setCanvasesSize,
    grid,
    mazeCtx,
    mazeStates
  ) {
    const updatedNumOfRows = parseInputValue(this._inputRows.value);
    if (!updatedNumOfRows) {
      this._showWarning('rows');
      return;
    }

    const updatedNumOfCols = parseInputValue(this._inputCols.value);
    if (!updatedNumOfCols) {
      this._showWarning('cols');
      return;
    }

    if (
      updatedNumOfRows !== gridSize.numOfRows ||
      updatedNumOfCols !== gridSize.numOfCols
    ) {
      gridSize.numOfRows = updatedNumOfRows;
      gridSize.numOfCols = updatedNumOfCols;
      this._saveGridSizeToLocalStorage(gridSize);

      mazeStates.isGenerated = false;
      mazeStates.isSolutionFound = false;

      setCanvasesSize(gridSize, canvasSize);
      grid.setContent(gridSize.numOfRows, gridSize.numOfCols);
      grid.draw(mazeCtx);
    }

    this._close();
  }

  _saveGridSizeToLocalStorage(gridSize) {
    const stringifiedGridSize = JSON.stringify(gridSize);

    if (checkIsMobile()) {
      localStorage.setItem(GRID_SIZE_MOBILE, stringifiedGridSize);
      return;
    }

    if (checkIsTablet()) {
      localStorage.setItem(GRID_SIZE_TABLET, stringifiedGridSize);
      return;
    }

    if (checkIsBigTablet()) {
      localStorage.setItem(GRID_SIZE_BIG_TABLET, stringifiedGridSize);
      return;
    }

    localStorage.setItem(GRID_SIZE_DESKTOP, stringifiedGridSize);
  }

  _showWarning(content) {
    this._warningRoot.innerHTML = this._warningTemplate(content);
  }

  _clearWarning() {
    this._warningRoot.innerHTML = '';
  }

  _template() {
    return `
      <button type="button" class="btn" id="drawer-dismiss-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <span class="sr-only"></span>
      </button>
      <h2 class="${styles.drawerTitle}">Settings</h2>
      <div class="${styles.setting}">
        <h3>Grid Size</h3>
        <div class="${styles.warning}" id="drawer-warning"></div> 
        <label class="${styles.settingLabel}" id="rows-label">
          Rows
          <input id="rows" type="number" min="3" max="40"/>
          <span class="${styles.clue}">(Range: 3 - 40)</span>
        </label>
        <label class="${styles.settingLabel}" id="cols-label">
          Columns
          <input id="cols" type="number" min="3" max="40" />
          <span class="${styles.clue}">(Range: 3 - 40)</span>
        </label>
      </div>
      <div class="${styles.drawerActions}">
        <button type="button" class="btn btn--primary ${styles.drawerBtn}" id="save-settings-btn">Save</button>
      </div>
    `;
  }

  _warningTemplate(content) {
    return ` 
      <div class="${styles.warningBody}">
        <div class="${styles.warningContent}">
          <img class="${styles.warningIcon}" src=${alertIcon}>
          <p class="${styles.warningMessage}">
            <strong>Whoops. </strong>
            <span>You did not enter a valid number for ${content}</span>
          </p>
        </div>
      </div>
    `;
  }
}

const settingsDrawer = new SettingsDrawer();
export default settingsDrawer;
