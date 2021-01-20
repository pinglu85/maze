import { createElement, useRef, toggleElementDisable } from '../../utils';
import DescriptionContent from '../../shared/DescriptionContent';
import Button from '../../shared/Button';
import handleVisualize from './handleVisualize';

const MazeAlgoDescription = (props) => {
  const visualizeBtnRef = useRef();
  const {
    algo,
    description,
    getState,
    dispatch,
    subscribe,
    mazeCtx,
    solutionCtx,
  } = props;

  const handleClick = () => {
    handleVisualize(getState, dispatch, mazeCtx, solutionCtx);
  };

  subscribe((preState, state) => {
    toggleElementDisable(preState, state, visualizeBtnRef);
  });

  return (
    <DescriptionContent description={description}>
      <Button
        btnRef={visualizeBtnRef}
        style="primary"
        handleClick={handleClick}
      >
        {algo === 'Open Grid' ? 'Open Grid' : 'Visualize'}
      </Button>
    </DescriptionContent>
  );
};

export default MazeAlgoDescription;
