import * as actionTypes from './actionTypes';

export const updateGridSize = (payload) => ({
  type: actionTypes.gridSizeUpdated,
  payload: payload,
});

export const selectAlgo = (payload) => ({
  type: actionTypes.algoSelected,
  payload: payload,
});

export const mazeGenerationInit = () => ({
  type: actionTypes.mazeGenerationInit,
});

export const mazeGenerationSuccess = () => ({
  type: actionTypes.mazeGenerationSuccess,
});

export const solutionSearchInit = () => ({
  type: actionTypes.solutionSearchInit,
});

export const solutionSearchSuccess = () => ({
  type: actionTypes.solutionSearchSuccess,
});
