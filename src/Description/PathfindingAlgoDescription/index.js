import { createElement, useRef, toggleElementDisable } from '../../utils';
import DescriptionContent from '../../shared/DescriptionContent';
import Button from '../../shared/Button';
import handleVisualize from './handleVisualize';

const PathfindingAlgoDescription = (props) => {
  const visualizeBtnRef = useRef();
  const {
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

  subscribe((prevState, state) => {
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
    </DescriptionContent>
  );
};

export default PathfindingAlgoDescription;
