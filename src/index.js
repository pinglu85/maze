import {
  createElement,
  render,
  createStore,
  setInitialGridSize,
} from './utils';
import appReducer from './appReducer';
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
  isMazeGenerating: false,
  isMazeGenerated: false,
  isSearchingForSolution: false,
  isSolutionFound: false,
  isTaskCreateMaze: true,
};

const store = createStore(appReducer, initialAppState);

const rootElement = document.getElementById('root');
const node = render(<App store={store} />);
rootElement.appendChild(node);

setInitialGridSize(store.dispatch);
