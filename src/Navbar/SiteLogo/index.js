import { createDOMElement } from '../../utils';
import logo from '../../assets/logo.svg';
import styles from './style.module.css';

const siteLogo = createDOMElement({
  el: 'a',
  classes: [styles.siteLogo],
  href: './',
  innerHTML: logo,
});

export default siteLogo;
