import * as actionTypes from './constants/actionTypes';
import { CELL_SIZE, LINE_WIDTHS } from './constants/size';

const applyUpdateGridSize = (state, gridSize) => {
  const { numOfRows, numOfCols } = gridSize;
  const offset =
    LINE_WIDTHS.outerWall + LINE_WIDTHS.halfOuterInteriorWallDiff * 2;
  const canvasWidth = Math.floor(numOfCols * CELL_SIZE) + offset;
  const canvasHeight = Math.floor(numOfRows * CELL_SIZE) + offset;

  const algo = {
    ...state.algo,
  };
  if (!state.isTaskCreateMaze) {
    algo.isMazeAlgo = false;
    algo.name = '';
  }

  return {
    ...state,
    gridSize,
    canvasSize: {
      width: canvasWidth,
      height: canvasHeight,
    },
    algo,
    isMazeGenerated: false,
    isSolutionFound: false,
    isTaskCreateMaze: true,
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

const applyChangeTask = (state) => {
  const isNewTaskCreateMaze = !state.isTaskCreateMaze;
  return {
    ...state,
    isMazeGenerated: isNewTaskCreateMaze ? false : state.isMazeGenerated,
    isTaskCreateMaze: isNewTaskCreateMaze,
  };
};

function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.gridSizeUpdated: {
      return applyUpdateGridSize(state, action.payload);
    }
    case actionTypes.algoSelected: {
      return applySelectAlgo(state, action.payload);
    }
    case actionTypes.mazeGenerationInitiated: {
      return applyInitiateMazeGeneration(state);
    }
    case actionTypes.mazeGenerationCompleted: {
      return applyCompleteMazeGeneration(state);
    }
    case actionTypes.solvingProcessInitiated: {
      return applyInitiateSolvingProcess(state);
    }
    case actionTypes.solvingProcessCompleted: {
      return applyCompleteSolvingProcess(state);
    }
    case actionTypes.taskChanged: {
      return applyChangeTask(state, action.payload);
    }
    default:
      throw new Error('Should not reach here!');
  }
}

export default appReducer;
