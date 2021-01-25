import applySetGridSize from './utils/applySetGridSize';
import applySelectAlgo from './utils/applySelectAlgo';
import applyMazeGenerationInit from './utils/applyMazeGenerationInit';
import applyMazeGenerationSuccess from './utils/applyMazeGenerationSuccess';
import applySolutionSearchInit from './utils/applySolutionSearchInit';
import applySolutionSearchSuccess from './utils/applySolutionSearchSuccess';
import * as actionTypes from './actionTypes';

function appStateReducer(state, action) {
  switch (action.type) {
    case actionTypes.GRID_SIZE_SET:
      return applySetGridSize(state, action.payload);
    case actionTypes.ALGO_SELECT:
      return applySelectAlgo(state, action.payload);
    case actionTypes.MAZE_GENERATION_INIT:
      return applyMazeGenerationInit(state);
    case actionTypes.MAZE_GENERATION_SUCCESS:
      return applyMazeGenerationSuccess(state);
    case actionTypes.SOLUTION_SEARCH_INIT:
      return applySolutionSearchInit(state);
    case actionTypes.SOLUTION_SEARCH_SUCCESS:
      return applySolutionSearchSuccess(state);
    default:
      throw new Error('Should not reach here!');
  }
}

export default appStateReducer;
