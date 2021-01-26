import applyUpdateGridSize from './utils/applyUpdateGridSize';
import applySelectAlgo from './utils/applySelectAlgo';
import applyInitiateMazeGeneration from './utils/applyInitiateMazeGeneration';
import applyCompleteMazeGeneration from './utils/applyCompleteMazeGeneration';
import applyInitiateSolvingProcess from './utils/applyInitiateSolvingProcess';
import applyCompleteSolvingProcess from './utils/applyCompleteSolvingProcess';
import * as actionTypes from './actionTypes';

function appStateReducer(state, action) {
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

export default appStateReducer;
