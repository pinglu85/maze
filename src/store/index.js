import { createStore } from '../utils';
import appStateReducer from './appStateReducer';

const initialAppState = {
  gridSize: {
    numOfRows: 0,
    numOfCols: 0,
  },
  canvasSize: {
    width: 0,
    height: 0,
  },
  algoType: '',
  mazeAlgo: '',
  pathfindingAlgo: '',
  isSettingsDrawerOpen: false,
  popupWarning: {
    isShown: false,
    message: '',
  },
  isMazeGenerating: false,
  isMazeGenerated: false,
  isSearchingSolution: false,
  isSolutionFound: false,
};

const store = createStore(appStateReducer, initialAppState);

export default store;
