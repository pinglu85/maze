import warning from '../shared/Warning';
import dismissIcon from '../assets/x.svg';
import styles from './style.module.css';

class PopupWarning {
  constructor() {
    this.root = document.getElementById('popup-warning');
    this.dismissBtn = null;
  }

  show(message) {
    this.root.classList.add('is-active');
    this.root.innerHTML = this._template(message);

    this.dismissBtn = document.getElementById('popup-warning-dismiss-btn');
    this.dismissBtn.addEventListener('click', this._hide);
  }

  _hide = () => {
    this.root.classList.remove('is-active');
    this.dismissBtn.removeEventListener('click', this._hide);
    this.root.innerHTML = '';
  };

  _template(message) {
    const dismissBtn = ` 
      <button type="button" id="popup-warning-dismiss-btn" class="${styles.dismiss}">
        ${dismissIcon}
        <span class="sr-only">Dismiss Warning</span>
      </button>
    `;
    return warning.template(message, dismissBtn);
  }
}

const popupWarning = new PopupWarning();

export default popupWarning;
