import { createDOMElement } from '../../utils';
import chevronDownIcon from '../../assets/chevron-down.svg';
import styles from './style.module.css';

class Dropdown {
  constructor(btnLabel, items, handleClickItem) {
    this._btnLabel = btnLabel;
    this._items = items;
    this._handleClickItem = handleClickItem;

    this.root = createDOMElement({
      el: 'div',
      classes: [styles.dropdown],
      innerHTML: this._template(),
      eventListener: { type: 'click', handler: this._handleClickInside },
    });
    this.menu = this.root.querySelector('ul');
  }

  _handleClickInside = (e) => {
    if (e.target && e.target.nodeName !== 'A') {
      this._openMenu();
      return;
    }

    this._handleClickItem(e);
    this._closeMenu();
  };

  _handleClickOutside = (e) => {
    const dropDownMenuIsShown = this.menu.classList.contains('is-active');
    const dropDownWrapperIsClicked = this.root.contains(e.target);
    if (dropDownMenuIsShown && !dropDownWrapperIsClicked) {
      this._closeMenu();
    }
  };

  _openMenu() {
    this.menu.classList.add('is-active');
    document.addEventListener('click', this._handleClickOutside);
  }

  _closeMenu() {
    this.menu.classList.remove('is-active');
    document.removeEventListener('click', this._handleClickOutside);
  }

  _template() {
    const items = this._items
      .map(({ text, style = '' }) => {
        return `
          <li class="${styles.dropdownItem} ${style ? styles[style] : ''}">
            <a href="#">${text}</a>
          </li>
        `;
      })
      .join('');

    return `
      <button type="button" class="btn ${styles.btnDropdown}">
        ${this._btnLabel}
        <span class="${styles.icon}">${chevronDownIcon}</span>       
      </button>
      <ul class="${styles.dropdownMenu}">
        ${items}
      </ul>
    `;
  }
}

export default Dropdown;
