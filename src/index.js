import {
  createElement,
  render,
  createStore,
  setInitialGridSize,
} from './utils';
import appStateReducer from './store/appStateReducer';
import App from './App';
import './index.css';

const initialAppState = {
  gridSize: {
    numOfRows: 0,
    numOfCols: 0,
  },
  canvasSize: {
    width: 0,
    height: 0,
  },
  algo: {
    type: '',
    name: '',
  },
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

const rootElement = document.getElementById('root');
const node = render(<App store={store} />);
rootElement.appendChild(node);

setInitialGridSize(store.dispatch);
