import {
  createElement,
  render,
  useRef,
  toggleElementDisable,
} from '../../utils';
import DescriptionContent from '../../sharedComponents/DescriptionContent';
import Button from '../../sharedComponents/Button';
import WarningWithDismiss from '../WarningWithDismiss';
import handleSolveMaze from './handleSolveMaze';
import styles from './style.module.css';

const PathfindingAlgoDescription = (props) => {
  const { description, store, mazeCtx, solutionCtx } = props;
  const solveBtnRef = useRef();
  const popupWarningRef = useRef();

  const showWarning = (message) => {
    if (!popupWarningRef.current) {
      return;
    }

    const root = popupWarningRef.current;
    const node = render(
      <WarningWithDismiss rootRef={popupWarningRef} message={message} />
    );
    root.appendChild(node);
    root.classList.add('is-active');
  };

  const handleClick = () => {
    handleSolveMaze(store, mazeCtx, solutionCtx, showWarning);
  };

  store.subscribe(toggleElementDisable(solveBtnRef));

  return (
    <DescriptionContent description={description}>
      <Button btnRef={solveBtnRef} style="primary" handleClick={handleClick}>
        Solve
      </Button>
      <div ref={popupWarningRef} className={styles.popupWarning}></div>
    </DescriptionContent>
  );
};

export default PathfindingAlgoDescription;
