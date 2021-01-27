import { createElement } from '../../utils';
import styles from './style.module.css';

const Button = ({ btnRef, style, handleClick, children }) => {
  let classNames = '';
  if (style) {
    classNames = style
      .split(' ')
      .map((name) => styles[name])
      .join(' ');
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className={`${styles.Btn} ${classNames}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
