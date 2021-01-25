import { createElement } from '../../../utils';
import styles from './style.module.css';

const Item = ({ item }) => (
  <li className={`${styles.Item} ${item.style ? styles[item.style] : ''}`}>
    <a id={item.id} href="#">
      {item.text}
    </a>
  </li>
);

export default Item;
