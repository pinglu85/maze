import { createDOMElement } from '../../utils';
import settingsDrawer from '../../SettingsDrawer';
import store from '../../store';
import settingsIcon from '../../assets/settings.svg';
import styles from './style.module.css';

const handleSettingsBtnClick = () => {
  const { gridSize } = store.getState();
  settingsDrawer.open(gridSize, store.dispatch);
};

const innerHtml = `
  ${settingsIcon}
  <span class="sr-only">Settings</span>
`;

const settingsBtn = createDOMElement({
  el: 'button',
  classes: ['btn', styles.btnSettings],
  eventListener: { type: 'click', handler: handleSettingsBtnClick },
  innerHTML: innerHtml,
});

export default settingsBtn;
