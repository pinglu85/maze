import alertIcon from '../../assets/alert-circle.svg';
import styles from './style.module.css';

class Warning {
  template(message, children = '') {
    return ` 
      <div class="${styles.body}">
        <div class="${styles.content}">
          <img class="${styles.icon}" src=${alertIcon}>
          <p class="${styles.message}">
            <strong>Whoops. </strong>
            <span>You did not ${message}.</span>
          </p>
        </div>
        ${children}
      </div>
    `;
  }
}

const warning = new Warning();

export default warning;
