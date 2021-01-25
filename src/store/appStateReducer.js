import applyUpdateGridSize from './utils/applyUpdateGridSize';
import applySelectAlgo from './utils/applySelectAlgo';
import applyMazeGenerationInit from './utils/applyMazeGenerationInit';
import applyMazeGenerationSuccess from './utils/applyMazeGenerationSuccess';
import applySolutionSearchInit from './utils/applySolutionSearchInit';
import applySolutionSearchSuccess from './utils/applySolutionSearchSuccess';
import * as actionTypes from './actionTypes';

function appStateReducer(state, action) {
  switch (action.type) {
    case actionTypes.gridSizeUpdated:
      return applyUpdateGridSize(state, action.payload);
    case actionTypes.algoSelected:
      return applySelectAlgo(state, action.payload);
    case actionTypes.mazeGenerationInit:
      return applyMazeGenerationInit(state);
    case actionTypes.mazeGenerationSuccess:
      return applyMazeGenerationSuccess(state);
    case actionTypes.solutionSearchInit:
      return applySolutionSearchInit(state);
    case actionTypes.solutionSearchSuccess:
      return applySolutionSearchSuccess(state);
    default:
      throw new Error('Should not reach here!');
  }
}

export default appStateReducer;
