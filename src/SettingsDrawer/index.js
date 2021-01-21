import { createElement, useRef, toggleElementDisable } from '../utils';
import { toggleSettingsDrawer } from '../store/actions';
import GridSizeSetting from './GridSizeSetting';
import Button from '../shared/Button';
import handleSaveSettings from './handleSaveSettings';
import dismissIcon from '../assets/x.svg';
import styles from './style.module.css';

const inputValues = {
  rows: '',
  cols: '',
};

const SettingsDrawer = ({ store }) => {
  const drawerRef = useRef();
  const backdropRef = useRef();
  const inputRowsRef = useRef();
  const inputColsRef = useRef();
  const warningRef = useRef();
  const saveBtnRef = useRef();

  const handleDismissDrawer = () => {
    store.dispatch(toggleSettingsDrawer());
  };

  const handleInput = function (e, id) {
    inputValues[id] = e.target.value;
    this.value = inputValues[id];
  };

  const handleToggleDrawer = (prevState, state) => {
    if (prevState.isSettingsDrawerOpen === state.isSettingsDrawerOpen) {
      return;
    }
    if (!drawerRef.current || !backdropRef.current) {
      return;
    }

    const {
      gridSize: { numOfRows, numOfCols },
      isSettingsDrawerOpen,
    } = state;
    const drawer = drawerRef.current;
    const backdrop = backdropRef.current;

    if (!isSettingsDrawerOpen) {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-active');
      return;
    }

    const inputRows = inputRowsRef.current;
    const inputCols = inputColsRef.current;
    inputRows.value = numOfRows;
    inputCols.value = numOfCols;
    inputValues.rows = String(numOfRows);
    inputValues.cols = String(numOfCols);

    warningRef.current.innerHTML = '';
    drawer.classList.add('is-open');
    backdrop.classList.add('is-active');
  };
  store.subscribe(handleToggleDrawer);

  store.subscribe((prevState, state) => {
    toggleElementDisable(prevState, state, saveBtnRef);
  });

  return (
    <>
      <div ref={drawerRef} className={styles.SettingsDrawer}>
        <Button handleClick={handleDismissDrawer}>{dismissIcon}</Button>
        <h2 className={styles.title}>Settings</h2>
        <GridSizeSetting
          warningRef={warningRef}
          inputRowsRef={inputRowsRef}
          inputColsRef={inputColsRef}
          handleInput={handleInput}
        />
        <div>
          <Button
            btnRef={saveBtnRef}
            style="primary fullWidth"
            handleClick={() => {
              handleSaveSettings(store, warningRef, inputValues);
            }}
          >
            Save
          </Button>
        </div>
      </div>
      <div ref={backdropRef} className={styles.backdrop}></div>
    </>
  );
};

export default SettingsDrawer;
