import { createElement, useRef, toggleElementDisable } from '../../utils';
import { doSelectAlgo } from './actionCreators';
import Button from '../../sharedComponents/Button';
import Item from './Item';
import chevronDownIcon from '../../assets/chevron-down.svg';
import styles from './style.module.css';

const Dropdown = ({ store, btnLabel, items }) => {
  const dropdownRef = useRef();
  const dropdownMenuRef = useRef();

  const handleClickInside = (e) => {
    if (e.target && e.target.nodeName !== 'A') {
      openMenu();
      return;
    }

    const { isMazeGenerating, isSearchingForSolution, algo } = store.getState();
    if (isMazeGenerating || isSearchingForSolution) {
      return;
    }

    const newAlgo = e.target.id;
    if (newAlgo === algo.name) {
      closeMenu();
      return;
    }

    store.dispatch(
      doSelectAlgo({
        isMazeAlgo: btnLabel === 'Maze Algorithms',
        name: newAlgo,
      })
    );
    closeMenu();
  };

  const handleClickOutside = (e) => {
    if (!dropdownRef.current || !dropdownMenuRef.current) {
      return;
    }

    const dropdownMenu = dropdownMenuRef.current;
    const dropDownMenuIsShown = dropdownMenu.classList.contains('is-active');
    const dropdown = dropdownRef.current;
    const dropDownWrapperIsClicked = dropdown.contains(e.target);

    if (dropDownMenuIsShown && !dropDownWrapperIsClicked) {
      closeMenu();
    }
  };

  const openMenu = () => {
    if (!dropdownMenuRef.current) {
      return;
    }

    dropdownMenuRef.current.classList.add('is-active');
    document.addEventListener('click', handleClickOutside);
  };

  const closeMenu = () => {
    if (!dropdownMenuRef.current) {
      return;
    }

    dropdownMenuRef.current.classList.remove('is-active');
    document.removeEventListener('click', handleClickOutside);
  };

  store.subscribe(toggleElementDisable(dropdownMenuRef));

  return (
    <div
      ref={dropdownRef}
      className={styles.Dropdown}
      onClick={handleClickInside}
    >
      <Button style="dropdown">
        {btnLabel}
        <span>{chevronDownIcon}</span>
      </Button>
      <ul ref={dropdownMenuRef} className={styles.dropdownMenu}>
        {items.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
