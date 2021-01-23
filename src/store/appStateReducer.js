import applyUpdateGridAndCanvasSize from './utils/applyUpdateGridAndCanvasSize';
import * as actionTypes from './actionTypes';

function appStateReducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_GRID_SIZE:
      return applyUpdateGridAndCanvasSize(state, action.payload);
    case actionTypes.SELECT_NEW_ALGO:
      return {
        ...state,
        algo: {
          type: action.payload.type,
          name: action.payload.name,
        },
      };
    case actionTypes.GENERATING_NEW_MAZE:
      return {
        ...state,
        isMazeGenerating: true,
        isMazeGenerated: false,
        isSearchingSolution: false,
        isSolutionFound: false,
      };
    case actionTypes.MAZE_GENERATED:
      return {
        ...state,
        isMazeGenerating: false,
        isMazeGenerated: true,
      };
    case actionTypes.SEARCHING_SOLUTION:
      return {
        ...state,
        isSearchingSolution: true,
        isSolutionFound: false,
      };
    case actionTypes.SOLUTION_FOUND:
      return {
        ...state,
        isSearchingSolution: false,
        isSolutionFound: true,
      };
    default:
      throw new Error('Should not reach here!');
  }
}

export default appStateReducer;
