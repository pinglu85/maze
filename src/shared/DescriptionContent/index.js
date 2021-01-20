import { createElement } from '../../utils';
import Icons from './Icons';
import styles from './style.module.css';

const DescriptionContent = ({ description, children }) => (
  <>
    <Icons icons={description.icons} />
    <div className={styles.text}>{description.text}</div>
    <div className={styles.actions}>{children}</div>
  </>
);

export default DescriptionContent;
