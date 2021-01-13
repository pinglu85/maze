import warning from '../shared/Warning';
import parseInputValue from './parseInputValue';
import { checkIsMobile, checkIsTablet, checkIsBigTablet } from '../utils';
import { updateGridSize } from '../store/actions';
import {
  GRID_SIZE_MOBILE,
  GRID_SIZE_TABLET,
  GRID_SIZE_BIG_TABLET,
  GRID_SIZE_DESKTOP,
} from '../constants/localStorageKeys';
import dismissIcon from '../assets/x.svg';
import styles from './style.module.css';

class SettingsDrawer {
  constructor() {
    this._root = document.getElementById('settings-drawer');
    this._root.innerHTML = this._template();
    this._backdrop = document.getElementById('backdrop');
    this._inputRows = document.getElementById('rows');
    this._inputCols = document.getElementById('cols');
    this._dismissBtn = document.getElementById('drawer-dismiss-btn');
    this.saveBtn = document.getElementById('save-settings-btn');
    this._warningRoot = document.getElementById('drawer-warning');
  }

  open(gridSize, dispatch) {
    this._root.classList.add('is-open');
    this._backdrop.classList.add('is-active');
    document.body.style.overflow = 'hidden';

    this._setInputsValue(gridSize);
    setTimeout(() => {
      this._inputRows.focus();
    }, 200);

    this._dismissBtn.addEventListener('click', this._close);

    [this._inputRows, this._inputCols].forEach((input) =>
      input.addEventListener('input', this._onInputChange)
    );

    this.saveBtn.addEventListener('click', () => {
      this._saveSettings(dispatch);
    });
  }

  _close = () => {
    this._root.classList.remove('is-open');
    this._backdrop.classList.remove('is-active');
    document.body.style.overflow = 'auto';

    [this._inputRows, this._inputCols].forEach((input) =>
      input.removeEventListener('input', this._onInputChange)
    );

    this._dismissBtn.removeEventListener('click', this._close);
    this.saveBtn.removeEventListener('click', this._saveSettings);

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

  _saveSettings(dispatch) {
    const updatedNumOfRows = parseInputValue(this._inputRows.value);
    let warningMessage = 'enter a valid number for';

    if (!updatedNumOfRows) {
      this._showWarning(`${warningMessage} rows`);
      return;
    }

    const updatedNumOfCols = parseInputValue(this._inputCols.value);
    if (!updatedNumOfCols) {
      this._showWarning(`${warningMessage} columns`);
      return;
    }

    const updatedGridSize = {
      numOfRows: updatedNumOfRows,
      numOfCols: updatedNumOfCols,
    };

    this._saveGridSizeToLocalStorage(updatedGridSize);
    dispatch(updateGridSize(updatedGridSize));

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

  _showWarning(message) {
    this._warningRoot.innerHTML = warning.template(message);
  }

  _clearWarning() {
    this._warningRoot.innerHTML = '';
  }

  _template() {
    return `
      <button type="button" class="btn" id="drawer-dismiss-btn">
        ${dismissIcon}
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
      <div>
        <button type="button" class="btn btn--primary ${styles.drawerBtn}" id="save-settings-btn">Save</button>
      </div>
    `;
  }
}

const settingsDrawer = new SettingsDrawer();
export default settingsDrawer;
