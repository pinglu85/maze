import { createElement } from '../../../utils';
import styles from './style.module.css';

const Icon = ({ icon }) => {
  const className = `${icon.iconSize ? styles[icon.iconSize] : ''}`;
  const style = {
    background: icon.bgColor,
    borderColor: icon.borderColor,
  };
  const svg = icon.svg ? icon.svg : '';

  return (
    <div className={styles.iconWrapper}>
      <div className={`${styles.icon} ${className}`} style={style}>
        {svg}
      </div>
      <div className={styles.label}>{icon.label}</div>
    </div>
  );
};

const Icons = ({ icons }) => (
  <ul className={styles.Icons}>
    {icons.map((icon) => (
      <li className={styles.listItem}>
        <Icon icon={icon} />
      </li>
    ))}
  </ul>
);

export default Icons;
