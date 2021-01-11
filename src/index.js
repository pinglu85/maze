import Grid from './Grid';
import StartNode from './StartNode';
import TargetNode from './TargetNode';
import popupWarning from './PopupWarning';
import settingsDrawer from './SettingsDrawer';
import description from './Description';
import mazeStateReducer from './store/mazeStateReducer';
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
  store,
} from './utils';
import {
  CELL_COLORS,
  FOOTPRINT_COLORS,
  GUIDES_COLOR,
} from './constants/colors';
import { CELL_SIZE, SPRITE_SIZE, LINE_WIDTHS } from './constants/size';
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
const startNode = new StartNode(startNodeSprites, SPRITE_SIZE);
const targetNodeSprites = loadTargetNodeSprites('normal', 'white');
const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);

const initialMazeState = {
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
  isGenerating: false,
  isGenerated: false,
  isSearchingSolution: false,
  isSolutionFound: false,
};

const mazeStore = store.createStore(mazeStateReducer, initialMazeState);

mazeStore.subscribe((prevState, state) => {
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

mazeStore.subscribe((prevState, state) => {
  if (
    prevState.isGenerating !== state.isGenerating ||
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

mazeStore.subscribe((prevState, state) => {
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
  setInitialGridSize(mazeStore.dispatch);
  description.render('');
});

settingsBtn.addEventListener('click', () => {
  const { gridSize } = mazeStore.getState();
  settingsDrawer.open(gridSize, mazeStore.dispatch);
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

  const { isGenerating, isSearchingSolution } = mazeStore.getState();
  if (isGenerating || isSearchingSolution) {
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
  const mazeState = mazeStore.getState();
  if (mazeState.isGenerating || mazeState.isSearchingSolution) {
    return;
  }

  if (mazeState.isGenerated) {
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
  const mazeState = mazeStore.getState();
  if (mazeState.isGenerating || mazeState.isSearchingSolution) {
    return;
  }

  if (!mazeState.isGenerated) {
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

  mazeStore.dispatch(searchingSolution());

  visualizePathfindingAlgo();
  startNode.pathCoordinates = await grid.findSolution(algo);
  if (!startNode.pathCoordinates.length) {
    mazeStore.dispatch(solutionFound());
    return;
  }

  drawSolution();
}

function drawMaze() {
  const { isGenerating, canvasSize, mazeAlgo } = mazeStore.getState();
  mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (mazeAlgo === 'Open Grid') {
    grid.drawGuides(mazeCtx);
  }
  grid.draw(mazeCtx);

  if (!isGenerating) {
    startNode.resetState(grid);
    startNode.draw(solutionCtx);

    targetNode.setPosition(grid);
    targetNode.draw(solutionCtx, 'spriteNormal');
    return;
  }

  requestAnimationFrame(drawMaze);
}

function visualizePathfindingAlgo() {
  const { mazeAlgo } = mazeStore.getState();
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
    startNode.drawFootprints(solutionCtx, FOOTPRINT_COLORS);
  };

  const { canvasSize } = mazeStore.getState();
  solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  if (startNode.atExit) {
    drawStartNodeAndFootprints();
    targetNode.resetScale();
    mazeStore.dispatch(solutionFound());
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite', true);
  targetNode.setScale();
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(drawSolution);
}
