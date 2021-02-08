import { createElement, useRef, toggleElementDisable } from '../../utils';
import DescriptionContent from '../../sharedComponents/DescriptionContent';
import Button from '../../sharedComponents/Button';
import handleGenerateMaze from './handleGenerateMaze';

const MazeAlgoDescription = (props) => {
  const { algoName, description, store, mazeCtx, solutionCtx } = props;
  const generateMazeBtnRef = useRef();

  const handleClick = () => {
    handleGenerateMaze(store, mazeCtx, solutionCtx);
  };

  store.subscribe(toggleElementDisable(generateMazeBtnRef));

  return (
    <DescriptionContent description={description}>
      <Button
        btnRef={generateMazeBtnRef}
        style="primary"
        handleClick={handleClick}
      >
        {algoName === 'OpenGrid' ? 'Create Open Grid' : 'Generate Maze'}
      </Button>
    </DescriptionContent>
  );
};

export default MazeAlgoDescription;
