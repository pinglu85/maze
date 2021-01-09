import Grid from './Grid';
import StartNode from './StartNode';
import TargetNode from './TargetNode';
import popupWarning from './PopupWarning';
import settingsDrawer from './SettingsDrawer';
import mazeStateReducer from './store/mazeStateReducer';
import {
  generatingNewMaze,
  mazeGenerated,
  searchingSolution,
  solutionFound,
} from './store/actions';
import {
  loadStartNodeSprites,
  loadTargetNodeSprites,
  setupCanvases,
  setDefaultGridSize,
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
let mazeAlgo = '';

const initialMazeState = {
  gridSize: {
    numOfRows: 0,
    numOfCols: 0,
  },
  canvasSize: {
    width: 0,
    height: 0,
  },
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
  }
});

window.addEventListener('DOMContentLoaded', () => {
  setDefaultGridSize(mazeStore.dispatch);
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

const handleMazeAlgosDropdownClick = async (e) => {
  if (e.target && e.target.nodeName !== 'A') {
    mazeAlgosList.classList.add('is-active');
    return;
  }

  mazeAlgosList.classList.remove('is-active');

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
  mazeAlgo = e.target.textContent;
  await grid.generateMaze(mazeAlgo);
  store.dispatch(mazeGenerated());
};
mazeAlgosDropdown.addEventListener('click', handleMazeAlgosDropdownClick);

const handlePathfindingAlgosDropdownClick = (e) => {
  if (e.target && e.target.nodeName !== 'A') {
    pathfindingAlgosList.classList.add('is-active');
    return;
  }

  pathfindingAlgosList.classList.remove('is-active');

  const mazeState = mazeStore.getState();
  if (mazeState.isGenerating || mazeState.isSearchingSolution) {
    return;
  }

  if (!mazeState.isGenerated) {
    popupWarning.show('generate a maze');
    return;
  }

  const { canvasSize, isSolutionFound } = mazeState;
  findSolution(e.target.textContent, canvasSize, isSolutionFound);
};
pathfindingAlgosDropdown.addEventListener(
  'click',
  handlePathfindingAlgosDropdownClick
);

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
  const { isGenerating, canvasSize } = mazeStore.getState();
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
