import * as actionTypes from './actionTypes';

export const updateGridSize = (payload) => ({
  type: actionTypes.UPDATE_GRID_SIZE,
  payload: payload,
});

export const selectAlgo = (payload) => ({
  type: actionTypes.SELECT_ALGO,
  payload: payload,
});

export const generatingNewMaze = () => ({
  type: actionTypes.GENERATING_NEW_MAZE,
});

export const mazeGenerated = () => ({
  type: actionTypes.MAZE_GENERATED,
});

export const searchingSolution = () => ({
  type: actionTypes.SEARCHING_SOLUTION,
});

export const solutionFound = () => ({
  type: actionTypes.SOLUTION_FOUND,
});
