import chevronDownIcon from '../../assets/chevron-down.svg';
import styles from './style.module.css';

class Dropdown {
  constructor(root, btnLabel, items, handleClickItem) {
    this.root = root;
    this.btnLabel = btnLabel;
    this.items = items;
    this.handleClickItem = handleClickItem;

    this.root.innerHTML = this._template();
    this.menu = this.root.querySelector('ul');
    this.root.addEventListener('click', this._handleClickInside);
  }

  _handleClickInside = (e) => {
    if (e.target && e.target.nodeName !== 'A') {
      this._openMenu();
      return;
    }

    this.handleClickItem(e);
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
    const items = this.items
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
      ${this.btnLabel}
        <span class="${styles.icon}">${chevronDownIcon}</span>       
      </button>
      <ul class="${styles.dropdownMenu}">
        ${items}
      </ul>
    `;
  }
}

export default Dropdown;
