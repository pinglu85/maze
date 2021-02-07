import { createElement, useRef, toggleElementDisable } from '../../utils';
import DescriptionContent from '../../sharedComponents/DescriptionContent';
import Button from '../../sharedComponents/Button';
import handleVisualize from './handleVisualize';

const MazeAlgoDescription = (props) => {
  const { algoName, description, store, mazeCtx, solutionCtx } = props;
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
        {algoName === 'OpenGrid' ? 'Create Open Grid' : 'Generate Maze'}
      </Button>
    </DescriptionContent>
  );
};

export default MazeAlgoDescription;
