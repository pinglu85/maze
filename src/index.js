import Grid from './Grid';
import StartNode from './StartNode';
import TargetNode from './TargetNode';
import popupWarning from './PopupWarning';
import settingsDrawer from './SettingsDrawer';
import description from './Description';
import appStateReducer from './store/appStateReducer';
import {
  selectNewMazeAlgo,
  selectNewPathfindingAlgo,
  generatingNewMaze,
  mazeGenerated,
  searchingSolution,
  solutionFound,
} from './store/actions';
import {
  loadStartNodeSprites,
  loadTargetNodeSprites,
  setupCanvases,
  setInitialGridSize,
  createStore,
} from './utils';
import {
  CELL_COLORS,
  FOOTPRINT_COLORS,
  GUIDES_COLOR,
} from './constants/colors';
import {
  CELL_SIZE,
  SPRITE_SIZE,
  FOOTPRINT_RADIUS,
  LINE_WIDTHS,
} from './constants/size';
import './index.css';

const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const pathfindingAlgosDropdown = document.getElementById(
  'pathfinding-algos-dropdown'
);
const pathfindingAlgosList = document.getElementById('pathfinding-algos-list');
const settingsBtn = document.getElementById('settings-btn');

const [[mazeCtx, solutionCtx], setCanvasesSize] = setupCanvases();

const grid = new Grid(CELL_SIZE, CELL_COLORS, LINE_WIDTHS, GUIDES_COLOR);
const startNodeSprites = loadStartNodeSprites(10);
const startNode = new StartNode(
  startNodeSprites,
  SPRITE_SIZE,
  FOOTPRINT_RADIUS,
  FOOTPRINT_COLORS
);
const targetNodeSprites = loadTargetNodeSprites('normal', 'white');
const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);

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
  isMazeGenerating: false,
  isMazeGenerated: false,
  isSearchingSolution: false,
  isSolutionFound: false,
};

const store = createStore(appStateReducer, initialAppState);

store.subscribe((prevState, state) => {
  const { gridSize: prevGridSize } = prevState;
  const { gridSize } = state;
  if (
    prevGridSize.numOfRows !== gridSize.numOfRows ||
    prevGridSize.numOfCols !== gridSize.numOfCols
  ) {
    setCanvasesSize(state.canvasSize);
    grid.setContent(gridSize);
    grid.draw(mazeCtx);
  }
});

store.subscribe((prevState, state) => {
  if (
    prevState.isMazeGenerating !== state.isMazeGenerating ||
    prevState.isSearchingSolution !== state.isSearchingSolution
  ) {
    mazeAlgosList.classList.toggle('disabled');
    pathfindingAlgosList.classList.toggle('disabled');
    settingsDrawer.saveBtn.disabled = !settingsDrawer.saveBtn.disabled;
    if (description.visualizeBtn) {
      description.visualizeBtn.disabled = !description.visualizeBtn.disabled;
    }
  }
});

store.subscribe((prevState, state) => {
  if (prevState.algoType !== state.algoType) {
    const currAlgoType = state.algoType;
    const algo = state[currAlgoType];
    const handleVisualize =
      currAlgoType === 'mazeAlgo'
        ? handleVisualizeMazeAlgo
        : handleVisualizePathfindingAlgo;
    description.render(algo, handleVisualize);
    return;
  }

  if (prevState.mazeAlgo !== state.mazeAlgo) {
    description.render(state.mazeAlgo, handleVisualizeMazeAlgo);
    return;
  }

  if (prevState.pathfindingAlgo !== state.pathfindingAlgo) {
    description.render(state.pathfindingAlgo, handleVisualizePathfindingAlgo);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setInitialGridSize(store.dispatch);
  description.render('');
});

settingsBtn.addEventListener('click', () => {
  const { gridSize } = store.getState();
  settingsDrawer.open(gridSize, store.dispatch);
});

const handleDropdownMenuClose = (e) => {
  const dropDowns = [
    [mazeAlgosList, mazeAlgosDropdown],
    [pathfindingAlgosList, pathfindingAlgosDropdown],
  ];

  dropDowns.forEach(([dropDownMenu, dropDownWrapper]) => {
    const dropDownMenuIsShown = dropDownMenu.classList.contains('is-active');
    const dropDownWrapperIsClicked = dropDownWrapper.contains(e.target);
    if (dropDownMenuIsShown && !dropDownWrapperIsClicked) {
      dropDownMenu.classList.remove('is-active');
    }
  });
};
document.addEventListener('click', handleDropdownMenuClose);

mazeAlgosDropdown.addEventListener('click', (e) => {
  handleDropdownClick(e, mazeAlgosList);
});

pathfindingAlgosDropdown.addEventListener('click', (e) => {
  handleDropdownClick(e, pathfindingAlgosList);
});

function handleDropdownClick(e, dropdownMenu) {
  if (e.target && e.target.nodeName !== 'A') {
    dropdownMenu.classList.add('is-active');
    return;
  }

  dropdownMenu.classList.remove('is-active');

  const { isMazeGenerating, isSearchingSolution } = store.getState();
  if (isMazeGenerating || isSearchingSolution) {
    return;
  }

  const algo = e.target.textContent;
  if (dropdownMenu.id === 'maze-algos-list') {
    store.dispatch(selectNewMazeAlgo(algo));
  } else {
    store.dispatch(selectNewPathfindingAlgo(algo));
  }
}

async function handleVisualizeMazeAlgo(algo) {
  const mazeState = store.getState();
  if (mazeState.isMazeGenerating || mazeState.isSearchingSolution) {
    return;
  }

  if (mazeState.isMazeGenerated) {
    const { gridSize, canvasSize } = mazeState;
    grid.setContent(gridSize);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  }

  store.dispatch(generatingNewMaze());

  drawMaze();
  await grid.generateMaze(algo);
  store.dispatch(mazeGenerated());
}

function handleVisualizePathfindingAlgo(algo) {
  const mazeState = store.getState();
  if (mazeState.isMazeGenerating || mazeState.isSearchingSolution) {
    return;
  }

  if (!mazeState.isMazeGenerated) {
    popupWarning.show('generate a maze');
    return;
  }

  const { canvasSize, isSolutionFound } = mazeState;
  findSolution(algo, canvasSize, isSolutionFound);
}

async function findSolution(algo, canvasSize, isSolutionFound) {
  if (isSolutionFound) {
    grid.clearSolution();
    startNode.resetState(grid);
    mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx, 'spriteNormal');
  }

  store.dispatch(searchingSolution());

  visualizePathfindingAlgo();
  startNode.pathCoordinates = await grid.findSolution(algo);
  if (!startNode.pathCoordinates.length) {
    store.dispatch(solutionFound());
    return;
  }

  drawSolution();
}

function drawMaze() {
  const { isMazeGenerating, canvasSize, mazeAlgo } = store.getState();
  mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (mazeAlgo === 'Open Grid') {
    grid.drawGuides(mazeCtx);
  }
  grid.draw(mazeCtx);

  if (!isMazeGenerating) {
    startNode.resetState(grid);
    startNode.draw(solutionCtx);

    targetNode.setPosition(grid);
    targetNode.draw(solutionCtx, 'spriteNormal');
    return;
  }

  requestAnimationFrame(drawMaze);
}

function visualizePathfindingAlgo() {
  const { mazeAlgo } = store.getState();
  if (mazeAlgo === 'Open Grid') {
    grid.drawGuides(mazeCtx);
  }
  grid.draw(mazeCtx);

  const isPathFound = startNode.pathCoordinates.length > 0;
  if (isPathFound) {
    return;
  }

  requestAnimationFrame(visualizePathfindingAlgo);
}

function drawSolution() {
  const drawStartNodeAndFootprints = () => {
    startNode.draw(solutionCtx);
    startNode.drawFootprints(solutionCtx);
  };

  const { canvasSize } = store.getState();
  solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  if (startNode.atExit) {
    drawStartNodeAndFootprints();
    targetNode.resetScale();
    store.dispatch(solutionFound());
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite', true);
  targetNode.setScale();
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(drawSolution);
}
