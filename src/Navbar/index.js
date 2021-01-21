import { createElement } from '../utils';
import { toggleSettingsDrawer } from '../store/actions';
import MazeAlgosDropdown from './MazeAlgosDropdown';
import PathfindingAlgosDropdown from './PathfindingAlgosDropdown';
import Button from '../shared/Button';
import logo from '../assets/logo.svg';
import settingsIcon from '../assets/settings.svg';
import styles from './style.module.css';

const Navbar = ({ store }) => {
  const handleSettingsBtnClick = () => {
    store.dispatch(toggleSettingsDrawer());
  };

  return (
    <nav className={styles.Navbar}>
      <a href="/" className={styles.siteLogo}>
        {logo}
      </a>
      <div className={styles.navItems}>
        <div className={styles.dropdowns}>
          <MazeAlgosDropdown store={store} />
          <PathfindingAlgosDropdown store={store} />
        </div>
        <Button style="settings" handleClick={handleSettingsBtnClick}>
          <span>{settingsIcon}</span>
          <span className="sr-only">Settings</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
