import {
  createElement,
  render,
  useRef,
  toggleElementDisable,
} from '../../utils';
import DescriptionContent from '../../shared/DescriptionContent';
import Button from '../../shared/Button';
import WarningWithDismiss from '../WarningWithDismiss';
import handleVisualize from './handleVisualize';
import styles from './style.module.css';

const PathfindingAlgoDescription = (props) => {
  const { description, store, mazeCtx, solutionCtx } = props;
  const visualizeBtnRef = useRef();
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
    handleVisualize(store, mazeCtx, solutionCtx, showWarning);
  };

  store.subscribe((prevState, state) => {
    toggleElementDisable(prevState, state, visualizeBtnRef);
  });

  return (
    <DescriptionContent description={description}>
      <Button
        btnRef={visualizeBtnRef}
        style="primary"
        handleClick={handleClick}
      >
        Visualize
      </Button>
      <div ref={popupWarningRef} className={styles.popupWarning}></div>
    </DescriptionContent>
  );
};

export default PathfindingAlgoDescription;
