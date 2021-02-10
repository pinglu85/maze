import * as actionTypes from '../constants/actionTypes';

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

export const doChangeTask = (taskName) => ({
  type: actionTypes.taskChanged,
  payload: taskName,
});
