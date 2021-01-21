import { createElement, useRef, toggleElementDisable } from '../../utils';
import DescriptionContent from '../../shared/DescriptionContent';
import Button from '../../shared/Button';
import handleVisualize from './handleVisualize';

const MazeAlgoDescription = (props) => {
  const { algo, description, store, mazeCtx, solutionCtx } = props;
  const visualizeBtnRef = useRef();

  const handleClick = () => {
    handleVisualize(store, mazeCtx, solutionCtx);
  };

  store.subscribe((preState, state) => {
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
