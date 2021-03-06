import { createElement, render, useRef } from '../utils';
import { taskChanged, gridSizeUpdated } from '../constants/actionTypes';
import MazeAlgosDropdown from './MazeAlgosDropdown';
import PathfindingAlgosDropdown from './PathfindingAlgosDropdown';
import SettingsDrawer from '../SettingsDrawer';
import Button from '../sharedComponents/Button';
import logo from '../assets/logo.svg';
import settingsIcon from '../assets/settings.svg';
import styles from './style.module.css';

const inputValues = {
  rows: '',
  cols: '',
};

const Navbar = ({ store }) => {
  const dropdownWrapperRef = useRef();
  const drawerRef = useRef();
  const backdropRef = useRef();
  const inputRowsRef = useRef();
  const inputColsRef = useRef();

  const handleSettingsDrawerOpen = () => {
    if (!drawerRef.current || !backdropRef.current) {
      return;
    }

    const {
      gridSize: { numOfRows, numOfCols },
    } = store.getState();
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;

    const inputRows = inputRowsRef.current;
    const inputCols = inputColsRef.current;
    inputRows.value = numOfRows;
    inputCols.value = numOfCols;
    inputValues.rows = String(numOfRows);
    inputValues.cols = String(numOfCols);

    drawer.classList.add('is-open');
    backdrop.classList.add('is-active');
  };

  const changeDropdownOnTaskChange = (_, state) => {
    if (!dropdownWrapperRef.current) {
      return;
    }

    const dropdownWrapper = dropdownWrapperRef.current;
    dropdownWrapper.innerHTML = '';
    let node;

    if (state.isTaskCreateMaze) {
      node = render(<MazeAlgosDropdown store={store} />);
    } else {
      node = render(<PathfindingAlgosDropdown store={store} />);
    }

    dropdownWrapper.appendChild(node);
  };
  store.subscribe({
    actionTypes: [taskChanged, gridSizeUpdated],
    subscriber: changeDropdownOnTaskChange,
  });

  return (
    <nav className={styles.Navbar}>
      <a href="./" className={styles.siteLogo}>
        {logo}
      </a>
      <div className={styles.navItems}>
        <div ref={dropdownWrapperRef} className={styles.dropdownWrapper}></div>
        <Button style="settings" handleClick={handleSettingsDrawerOpen}>
          <span>{settingsIcon}</span>
          <span className="sr-only">Settings</span>
        </Button>
      </div>
      <SettingsDrawer
        store={store}
        drawerRef={drawerRef}
        backdropRef={backdropRef}
        inputRowsRef={inputRowsRef}
        inputColsRef={inputColsRef}
        inputValues={inputValues}
      />
    </nav>
  );
};

export default Navbar;
