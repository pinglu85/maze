import {
  createElement,
  render,
  createStore,
  setInitialGridSize,
} from './utils';
import appReducer from './appReducer';
import App from './App';
import { CREATE_MAZE } from './constants/taskNames';
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
  task: CREATE_MAZE,
};

const store = createStore(appReducer, initialAppState);

const rootElement = document.getElementById('root');
const node = render(<App store={store} />);
rootElement.appendChild(node);

setInitialGridSize(store.dispatch);
