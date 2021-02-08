import { createElement, useRef, toggleElementDisable } from '../../utils';
import DescriptionContent from '../../sharedComponents/DescriptionContent';
import Button from '../../sharedComponents/Button';
import handleVisualize from './handleVisualize';

const PathfindingAlgoDescription = (props) => {
  const { description, store, mazeCtx, solutionCtx } = props;
  const visualizeBtnRef = useRef();

  const handleClick = () => {
    handleVisualize(store, mazeCtx, solutionCtx);
  };

  store.subscribe(toggleElementDisable(visualizeBtnRef));

  return (
    <DescriptionContent description={description}>
      <Button
        btnRef={visualizeBtnRef}
        style="primary"
        handleClick={handleClick}
      >
        Solve
      </Button>
    </DescriptionContent>
  );
};

export default PathfindingAlgoDescription;
