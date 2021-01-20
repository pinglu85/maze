import { createElement } from '../../utils';
import styles from './style.module.css';

const InputWithLabel = ({ inputRef, id, label, handleInput }) => (
  <label className={styles.label}>
    {label}
    <input
      ref={inputRef}
      type="number"
      min="3"
      max="40"
      onInput={function (e) {
        handleInput.call(this, e, id);
      }}
    />
    <span className={styles.clue}>(Range: 3 - 40)</span>
  </label>
);

export default InputWithLabel;
