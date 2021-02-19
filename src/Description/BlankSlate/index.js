import { createElement, useRef } from '../../utils';
import Button from '../../sharedComponents/Button';
import helpIcon from '../../assets/help-circle.svg';
import styles from './style.module.css';

const BlankSlate = ({ isTaskCreateMaze }) => {
  const tooltipRef = useRef();

  const handleToggleTooltip = () => {
    if (!tooltipRef.current) {
      return;
    }

    tooltipRef.current.classList.toggle('is-active');
  };

  let children;

  if (isTaskCreateMaze) {
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
            Click on the maze to <b>add a weight</b>.
          </p>
          <Button style="smallIcon helpIcon" handleClick={handleToggleTooltip}>
            {helpIcon}
            <span className="sr-only">Tooltip</span>
          </Button>
          <Tooltip tooltipRef={tooltipRef} handleClick={handleToggleTooltip} />
        </div>
        <p>Click again to delete a weight.</p>
      </>
    );
  }

  return <div className={styles.BlankSlate}>{children}</div>;
};

const Tooltip = ({ tooltipRef, handleClick }) => (
  <div ref={tooltipRef} className={styles.Tooltip}>
    <p>
      A weighted cell is more costly to move through. In this application,
      moving through a weighted cell has a cost of 20. (Unweighted algorithms
      will ignore weights.)
    </p>
    <div className={styles.TooltipAction}>
      <Button style="primary smallPadding" handleClick={handleClick}>
        Got it
      </Button>
    </div>
  </div>
);

export default BlankSlate;
