import { createElement, useRef, toggleElementDisable } from '../../utils';
import DescriptionContent from '../../shared/DescriptionContent';
import Button from '../../shared/Button';
import handleVisualize from './handleVisualize';

const PathfindingAlgoDescription = (props) => {
  const { description, store, mazeCtx, solutionCtx } = props;
  const visualizeBtnRef = useRef();

  const handleClick = () => {
    handleVisualize(store, mazeCtx, solutionCtx);
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
    </DescriptionContent>
  );
};

export default PathfindingAlgoDescription;
