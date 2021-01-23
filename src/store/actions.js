import * as actionTypes from './actionTypes';

export const setGridSize = (payload) => ({
  type: actionTypes.SET_GRID_SIZE,
  payload: payload,
});

export const selectAlgo = (payload) => ({
  type: actionTypes.SELECT_ALGO,
  payload: payload,
});

export const mazeGenerationInit = () => ({
  type: actionTypes.MAZE_GENERATION_INIT,
});

export const mazeGenerationSuccess = () => ({
  type: actionTypes.MAZE_GENERATION_SUCCESS,
});

export const solutionSearchInit = () => ({
  type: actionTypes.SOLUTION_SEARCH_INIT,
});

export const solutionSearchSuccess = () => ({
  type: actionTypes.SOLUTION_SEARCH_SUCCESS,
});
