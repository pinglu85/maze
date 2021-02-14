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

  const changeNextStepBtnDisableStateAndStyle = (_, state) => {
    if (!nextStepBtnRef.current || !generateMazeBtnRef.current) {
      return;
    }

    const nextStepBtn = nextStepBtnRef.current;

    if (state.isMazeGenerating) {
      nextStepBtn.disabled = true;
      return;
    }

    const generateMazeBtn = generateMazeBtnRef.current;

    if (!state.isMazeGenerated) {
      nextStepBtn.disabled = true;
      nextStepBtn.classList.remove('primary');
      nextStepBtn.classList.add('ghost');
      generateMazeBtn.classList.remove('ghost');
      generateMazeBtn.classList.add('primary');
      return;
    }

    nextStepBtn.disabled = false;
    nextStepBtn.classList.remove('ghost');
    nextStepBtn.classList.add('primary');
    generateMazeBtn.classList.remove('primary');
    generateMazeBtn.classList.add('ghost');
  };
  store.subscribe({
    actionTypes: [
      actionTypes.gridSizeUpdated,
      actionTypes.mazeGenerationCompleted,
      actionTypes.mazeGenerationInitiated,
    ],
    subscriber: changeNextStepBtnDisableStateAndStyle,
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
