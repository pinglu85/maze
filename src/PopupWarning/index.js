import alertIcon from '../assets/alert-circle.svg';
import dismissIcon from '../assets/x.svg';
import styles from './style.module.css';

class PopupWarning {
  constructor() {
    this.root = document.getElementById('popup-warning');
    this.dismissBtn = null;
  }

  show(content) {
    this.root.classList.add('is-active');
    this.root.innerHTML = this._template(content);

    this.dismissBtn = document.getElementById('dismiss-btn');
    this.dismissBtn.addEventListener('click', this._hide);
  }

  _hide = () => {
    this.root.classList.remove('is-active');
    this.dismissBtn.removeEventListener('click', this._hide);
    this.root.innerHTML = '';
  };

  _template(content) {
    let message = '';

    switch (content) {
      case 'rows':
      case 'columns':
        message = `You did not enter a valid number for ${content}.`;
        break;
      case 'algorithm':
        message = `You did not select an ${content}.`;
        break;
      case 'maze':
        message = `You did not generate a ${content}.`;
        break;
      default:
        return '';
    }

    return `
    <div class="${styles.body}">
      <div class="${styles.content}">
        <img class="${styles.icon}" src=${alertIcon}>
        <p class="${styles.message}">
          <strong>Whoops. </strong>
          <span>${message}</span>
        </p>
      </div>
      <button type="button" id="dismiss-btn" class="btn ${styles.dismiss}">
        <img class="${styles.icon}" src=${dismissIcon}>
        <span class="sr-only">Dismiss Warning</span>
      </button>
    </div>
  `;
  }
}

const popupWarning = new PopupWarning();

export default popupWarning;
