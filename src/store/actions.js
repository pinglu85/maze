import * as actionTypes from './actionTypes';

export const updateGridSize = (payload) => ({
  type: actionTypes.UPDATE_GRID_SIZE,
  payload: payload,
});

export const selectNewMazeAlgo = (payload) => ({
  type: actionTypes.SELECT_NEW_MAZE_ALGO,
  payload: payload,
});

export const selectNewPathfindingAlgo = (payload) => ({
  type: actionTypes.SELECT_NEW_PATHFINDING_ALGO,
  payload: payload,
});

export const toggleSettingsDrawer = () => ({
  type: actionTypes.TOGGLE_SETTINGS_DRAWER,
});

export const togglePopupWarning = (payload = '') => ({
  type: actionTypes.TOGGLE_POPUP_WARNING,
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
