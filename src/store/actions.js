import * as actionTypes from './actionTypes';

export const updateGridSize = (payload) => ({
  type: actionTypes.gridSizeUpdated,
  payload: payload,
});

export const selectAlgo = (payload) => ({
  type: actionTypes.algoSelected,
  payload: payload,
});

export const initiateMazeGeneration = () => ({
  type: actionTypes.mazeGenerationInitiated,
});

export const completeMazeGeneration = () => ({
  type: actionTypes.mazeGenerationCompleted,
});

export const initiateSolvingProcess = () => ({
  type: actionTypes.solvingProcessInitiated,
});

export const completeSolvingProcess = () => ({
  type: actionTypes.solvingProcessCompleted,
});
