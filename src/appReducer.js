import * as actionTypes from './constants/actionTypes';
import { CELL_SIZE, LINE_WIDTHS } from './constants/size';

const applyUpdateGridSize = (state, gridSize) => {
  const { numOfRows, numOfCols } = gridSize;
  const offset =
    LINE_WIDTHS.outerWall + LINE_WIDTHS.halfOuterInteriorWallDiff * 2;
  const canvasWidth = Math.floor(numOfCols * CELL_SIZE) + offset;
  const canvasHeight = Math.floor(numOfRows * CELL_SIZE) + offset;

  return {
    ...state,
    gridSize,
    canvasSize: {
      width: canvasWidth,
      height: canvasHeight,
    },
    isMazeGenerated: false,
    isSolutionFound: false,
  };
};

const applySelectAlgo = (state, algo) => ({
  ...state,
  algo,
});

const applyInitiateMazeGeneration = (state) => ({
  ...state,
  isMazeGenerating: true,
  isMazeGenerated: false,
  isSearchingForSolution: false,
  isSolutionFound: false,
});

const applyCompleteMazeGeneration = (state) => ({
  ...state,
  isMazeGenerating: false,
  isMazeGenerated: true,
});

const applyInitiateSolvingProcess = (state) => ({
  ...state,
  isSearchingForSolution: true,
  isSolutionFound: false,
});

const applyCompleteSolvingProcess = (state) => ({
  ...state,
  isSearchingForSolution: false,
  isSolutionFound: true,
});

function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.gridSizeUpdated:
      return applyUpdateGridSize(state, action.payload);
    case actionTypes.algoSelected:
      return applySelectAlgo(state, action.payload);
    case actionTypes.mazeGenerationInitiated:
      return applyInitiateMazeGeneration(state);
    case actionTypes.mazeGenerationCompleted:
      return applyCompleteMazeGeneration(state);
    case actionTypes.solvingProcessInitiated:
      return applyInitiateSolvingProcess(state);
    case actionTypes.solvingProcessCompleted:
      return applyCompleteSolvingProcess(state);
    default:
      throw new Error('Should not reach here!');
  }
}

export default appReducer;
