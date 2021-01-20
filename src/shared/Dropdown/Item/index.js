import { createElement } from '../../../utils';
import styles from './style.module.css';

const Item = ({ item }) => (
  <li className={`${styles.Item} ${item.style ? styles[item.style] : ''}`}>
    <a href="#">{item.text}</a>
  </li>
);

export default Item;
