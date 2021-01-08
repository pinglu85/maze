import doUpdateGridAndCanvasSize from './utils/doUpdateGridAndCanvasSize';
import * as actionTypes from './actionTypes';

function mazeStateReducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_GRID_SIZE:
      return doUpdateGridAndCanvasSize(state, action.payload);
    case actionTypes.GENERATING_NEW_MAZE:
      return {
        ...state,
        isGenerating: true,
        isGenerated: false,
        isSearchingSolution: false,
        isSolutionFound: false,
      };
    case actionTypes.MAZE_GENERATED:
      return {
        ...state,
        isGenerating: false,
        isGenerated: true,
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

export default mazeStateReducer;
