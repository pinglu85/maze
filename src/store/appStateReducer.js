import doUpdateGridAndCanvasSize from './storeUtils/doUpdateGridAndCanvasSize';
import * as actionTypes from './actionTypes';

function appStateReducer(state, action) {
  switch (action.type) {
    case actionTypes.UPDATE_GRID_SIZE:
      return doUpdateGridAndCanvasSize(state, action.payload);
    case actionTypes.SELECT_NEW_MAZE_ALGO:
      return {
        ...state,
        algoType: 'mazeAlgo',
        mazeAlgo: action.payload,
      };
    case actionTypes.SELECT_NEW_PATHFINDING_ALGO:
      return {
        ...state,
        algoType: 'pathfindingAlgo',
        pathfindingAlgo: action.payload,
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
