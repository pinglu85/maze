import { createElement, useRef, toggleElementDisable } from '../../utils';
import * as actionTypes from '../../constants/actionTypes';
import { doChangeTask } from '../actionCreators';
import { SOLVE_MAZE } from '../../constants/taskNames';
import DescriptionContent from '../../sharedComponents/DescriptionContent';
import Button from '../../sharedComponents/Button';
import handleGenerateMaze from './handleGenerateMaze';

const MazeAlgoDescription = (props) => {
  const {
    algoName,
    description,
    store,
    mazeCtx,
    solutionCtx,
    isNextStepBtnDisabled,
  } = props;
  const generateMazeBtnRef = useRef();
  const nextStepBtnRef = useRef();

  const handleNextStep = () => {
    store.dispatch(doChangeTask(SOLVE_MAZE));
  };

  const toggleNextStepBtnDisable = (_, state) => {
    if (!nextStepBtnRef.current || !generateMazeBtnRef.current) {
      return;
    }

    const nextStepBtn = nextStepBtnRef.current;

    if (state.isMazeGenerating) {
      nextStepBtn.disabled = true;
      return;
    }

    if (nextStepBtn.disabled) {
      nextStepBtn.disabled = false;
      nextStepBtn.classList.remove('ghost');
      nextStepBtn.classList.add('primary');

      const generateMazeBtn = generateMazeBtnRef.current;
      generateMazeBtn.classList.remove('primary');
      generateMazeBtn.classList.add('ghost');
    }
  };
  store.subscribe({
    actionTypes: [
      actionTypes.mazeGenerationCompleted,
      actionTypes.mazeGenerationInitiated,
    ],
    subscriber: toggleNextStepBtnDisable,
  });

  store.subscribe(toggleElementDisable(generateMazeBtnRef));

  return (
    <DescriptionContent description={description}>
      <Button
        btnRef={generateMazeBtnRef}
        style={isNextStepBtnDisabled ? 'primary' : 'ghost'}
        handleClick={() => {
          handleGenerateMaze(store, mazeCtx, solutionCtx);
        }}
      >
        {algoName === 'OpenGrid' ? 'Create Open Grid' : 'Generate Maze'}
      </Button>
      <Button
        btnRef={nextStepBtnRef}
        style={isNextStepBtnDisabled ? 'ghost' : 'primary'}
        isDisabled={isNextStepBtnDisabled}
        handleClick={handleNextStep}
      >
        Next Step
      </Button>
    </DescriptionContent>
  );
};

export default MazeAlgoDescription;
