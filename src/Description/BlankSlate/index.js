import { createElement, useRef } from '../../utils';
import { CREATE_MAZE } from '../../constants/taskNames';
import Button from '../../sharedComponents/Button';
import helpIcon from '../../assets/help-circle.svg';
import styles from './style.module.css';

const BlankSlate = ({ task }) => {
  const hintRef = useRef();

  const handleToggleHint = () => {
    if (!hintRef.current) {
      return;
    }

    hintRef.current.classList.toggle('is-active');
  };

  let children;

  if (task === CREATE_MAZE) {
    children = (
      <p>
        Pick a <b>maze algorithm</b> and generate a maze!
      </p>
    );
  } else {
    children = (
      <>
        <p>
          Pick a <b>pathfinding algorithm</b> and solve the maze!
        </p>
        <div className={styles.weightInfo}>
          <p>
            Click on the maze to <b>add weights</b>.
          </p>
          <Button style="smallIcon helpIcon" handleClick={handleToggleHint}>
            {helpIcon}
            <span className="sr-only">Hint</span>
          </Button>
          <Hint hintRef={hintRef} handleClick={handleToggleHint} />
        </div>
      </>
    );
  }

  return <div className={styles.BlankSlate}>{children}</div>;
};

const Hint = ({ hintRef, handleClick }) => (
  <div ref={hintRef} className={styles.Hint}>
    <p>
      A weighted cell is more costly to move through. In this application,
      moving through a weighted cell has a cost of 20. (Unweighted algorithms
      will ignore weights.)
    </p>
    <div className={styles.HintAction}>
      <Button style="primary smallPadding" handleClick={handleClick}>
        Got it
      </Button>
    </div>
  </div>
);

export default BlankSlate;
