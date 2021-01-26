import * as actionTypes from './actionTypes';

export const doUpdateGridSize = (payload) => ({
  type: actionTypes.gridSizeUpdated,
  payload: payload,
});

export const doSelectAlgo = (payload) => ({
  type: actionTypes.algoSelected,
  payload: payload,
});

export const doInitiateMazeGeneration = () => ({
  type: actionTypes.mazeGenerationInitiated,
});

export const doCompleteMazeGeneration = () => ({
  type: actionTypes.mazeGenerationCompleted,
});

export const doInitiateSolvingProcess = () => ({
  type: actionTypes.solvingProcessInitiated,
});

export const doCompleteSolvingProcess = () => ({
  type: actionTypes.solvingProcessCompleted,
});
