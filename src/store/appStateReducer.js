import applyUpdateGridAndCanvasSize from './utils/applySetGridSize';
import * as actionTypes from './actionTypes';

function appStateReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_GRID_SIZE:
      return applyUpdateGridAndCanvasSize(state, action.payload);
    case actionTypes.SELECT_ALGO:
      return {
        ...state,
        algo: {
          type: action.payload.type,
          name: action.payload.name,
        },
      };
    case actionTypes.MAZE_GENERATION_INIT:
      return {
        ...state,
        isMazeGenerating: true,
        isMazeGenerated: false,
        isSearchingForSolution: false,
        isSolutionFound: false,
      };
    case actionTypes.MAZE_GENERATION_SUCCESS:
      return {
        ...state,
        isMazeGenerating: false,
        isMazeGenerated: true,
      };
    case actionTypes.SOLUTION_SEARCH_INIT:
      return {
        ...state,
        isSearchingForSolution: true,
        isSolutionFound: false,
      };
    case actionTypes.SOLUTION_SEARCH_SUCCESS:
      return {
        ...state,
        isSearchingForSolution: false,
        isSolutionFound: true,
      };
    default:
      throw new Error('Should not reach here!');
  }
}

export default appStateReducer;
