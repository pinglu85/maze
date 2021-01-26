import { createElement, useRef, toggleElementDisable } from '../utils';
import GridSizeSettings from './GridSizeSettings';
import Button from '../shared/Button';
import handleSaveSettings from './handleSaveSettings';
import dismissIcon from '../assets/x.svg';
import styles from './style.module.css';

const SettingsDrawer = (props) => {
  const {
    store,
    drawerRef,
    backdropRef,
    inputRowsRef,
    inputColsRef,
    inputValues,
  } = props;
  const warningRef = useRef();
  const saveBtnRef = useRef();

  const handleDrawerClose = () => {
    if (!drawerRef.current || !backdropRef.current || !warningRef.current) {
      return;
    }

    drawerRef.current.classList.remove('is-open');
    backdropRef.current.classList.remove('is-active');
    warningRef.current.innerHTML = '';
  };

  const handleInput = function (e, id) {
    inputValues[id] = e.target.value;
    this.value = inputValues[id];
  };

  const handleSaveBtnClick = () => {
    handleSaveSettings(store, warningRef, inputValues, handleDrawerClose);
  };

  store.subscribe(toggleElementDisable(saveBtnRef));

  return (
    <>
      <div ref={drawerRef} className={styles.SettingsDrawer}>
        <Button handleClick={handleDrawerClose}>{dismissIcon}</Button>
        <h2 className={styles.title}>Settings</h2>
        <GridSizeSettings
          warningRef={warningRef}
          inputRowsRef={inputRowsRef}
          inputColsRef={inputColsRef}
          handleInput={handleInput}
        />
        <div>
          <Button
            btnRef={saveBtnRef}
            style="primary fullWidth"
            handleClick={handleSaveBtnClick}
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
