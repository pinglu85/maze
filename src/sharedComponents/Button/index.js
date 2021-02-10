import { createElement } from '../../utils';
import styles from './style.module.css';

const Button = ({ btnRef, style, handleClick, isDisabled, children }) => {
  let classNames = '';
  if (style) {
    classNames = style
      .split(' ')
      .map((name) =>
        name === 'primary' || name === 'ghost' ? name : styles[name]
      )
      .join(' ');
  }

  return (
    <button
      ref={btnRef}
      type="button"
      className={`${styles.Btn} ${classNames}`}
      onClick={handleClick}
      disabled={isDisabled ? true : undefined}
    >
      {children}
    </button>
  );
};

export default Button;
