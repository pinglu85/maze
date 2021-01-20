import { createElement } from '../../utils';
import styles from './style.module.css';

const Section = ({ style, title, children }) => (
  <div className={`${styles.Section} ${style ? styles[style] : ''}`}>
    <h3>{title}</h3>
    {children}
  </div>
);

export default Section;
