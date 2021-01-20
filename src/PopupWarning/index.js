import { createElement, render, useRef } from '../utils';
import store from '../store';
import WarningWithDismiss from './WarningWithDismiss';
import { togglePopupWarning } from '../store/actions';
import styles from './style.module.css';

const PopupWarning = () => {
  const rootRef = useRef();

  const handleDismiss = function () {
    store.dispatch(togglePopupWarning());
    this.removeEventListener('click', handleDismiss);
  };

  const toggleWarning = (prevState, state) => {
    if (prevState.popupWarning.isShown === state.popupWarning.isShown) {
      return;
    }

    if (!rootRef.current) {
      return;
    }

    const {
      popupWarning: { isShown, message },
    } = state;
    const root = rootRef.current;

    if (!isShown) {
      root.classList.remove('is-active');
      root.innerHTML = '';
      return;
    }

    const node = render(
      <WarningWithDismiss message={message} handleDismiss={handleDismiss} />
    );
    root.appendChild(node);
    root.classList.add('is-active');
  };
  store.subscribe(toggleWarning);

  return <div ref={rootRef} className={styles.PopupWarning}></div>;
};

export default PopupWarning;
