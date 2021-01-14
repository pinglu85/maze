import dropdownsWrapper from '../DropdownsWrapper';
import settingsBtn from '../SettingsBtn';
import { createDOMElement } from '../../utils';
import styles from './style.module.css';

const navItemsWrapper = createDOMElement({
  el: 'div',
  classes: [styles.navItemsWrapper],
  children: [dropdownsWrapper, settingsBtn],
});

export default navItemsWrapper;
