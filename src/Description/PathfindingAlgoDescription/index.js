import { createElement, useRef, toggleElementDisable } from '../../utils';
import { doChangeTask } from '../actionCreators';
import DescriptionContent from '../DescriptionContent';
import Button from '../../sharedComponents/Button';
import handleSolveMaze from './handleSolveMaze';

const PathfindingAlgoDescription = (props) => {
  const { description, store, mazeCtx, solutionCtx } = props;
  const newMazeBtnRef = useRef();
  const solveBtnRef = useRef();

  store.subscribe(toggleElementDisable(solveBtnRef, newMazeBtnRef));

  return (
    <DescriptionContent description={description}>
      <Button
        btnRef={newMazeBtnRef}
        style="ghost"
        handleClick={() => {
          store.dispatch(doChangeTask());
        }}
      >
        New Maze
      </Button>
      <Button
        btnRef={solveBtnRef}
        style="primary"
        handleClick={() => {
          handleSolveMaze(store, mazeCtx, solutionCtx);
        }}
      >
        Solve
      </Button>
    </DescriptionContent>
  );
};

export default PathfindingAlgoDescription;
