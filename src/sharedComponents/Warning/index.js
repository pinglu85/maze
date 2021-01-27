import { createElement } from '../../utils';
import alertIcon from '../../assets/alert-circle.svg';
import styles from './style.module.css';

const Warning = ({ message, children }) => {
  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.icon}>{alertIcon}</div>
        <p className={styles.message}>
          <strong>Whoops. </strong>
          <span>You did not {message}.</span>
        </p>
      </div>
      {children}
    </div>
  );
};

export default Warning;
