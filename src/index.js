import Grid from './Grid';
import StartNode from './StartNode';
import TargetNode from './TargetNode';
import warning from './Warning';
import settingsDrawer from './SettingsDrawer';
import {
  loadStartNodeSprites,
  loadTargetNodeSprites,
  setupCanvases,
  setDefaultGridSize,
} from './utils';
import { CELL_COLORS, FOOTPRINT_COLORS } from './constants/colors';
import { CELL_SIZE, SPRITE_SIZE, LINE_WIDTH } from './constants/size';
import './index.css';

const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const pathfindingAlgosDropdown = document.getElementById(
  'pathfinding-algos-dropdown'
);
const pathfindingAlgosList = document.getElementById('pathfinding-algos-list');
const settingsBtn = document.getElementById('settings-btn');

const [[mazeCtx, solutionCtx], setCanvasesSize] = setupCanvases();

const grid = new Grid(CELL_SIZE, CELL_COLORS, LINE_WIDTH);
const startNodeSprites = loadStartNodeSprites(10);
const startNode = new StartNode(startNodeSprites, SPRITE_SIZE);
const targetNodeSprites = loadTargetNodeSprites('normal', 'white');
const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);

const gridSize = {
  numOfRows: 0,
  numOfCols: 0,
};
const canvasSize = {
  width: 0,
  height: 0,
};

const mazeStates = {
  isGenerating: false,
  isGenerated: false,
  isSearchingSolution: false,
  isSolutionFound: false,
};

window.addEventListener('DOMContentLoaded', () => {
  setDefaultGridSize(gridSize);

  setCanvasesSize(gridSize, canvasSize);

  grid.setContent(gridSize.numOfRows, gridSize.numOfCols);
  grid.draw(mazeCtx);
});

settingsBtn.addEventListener('click', () => {
  settingsDrawer.open(
    gridSize,
    canvasSize,
    setCanvasesSize,
    grid,
    mazeCtx,
    mazeStates
  );
});

mazeAlgosDropdown.addEventListener('click', async (e) => {
  if (e.target && e.target.nodeName !== 'A') {
    mazeAlgosList.classList.add('is-active');
    return;
  }

  mazeAlgosList.classList.remove('is-active');

  if (mazeStates.isGenerating || mazeStates.isSearchingSolution) {
    return;
  }

  if (mazeStates.isGenerated) {
    grid.setContent(gridSize.numOfRows, gridSize.numOfCols);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    mazeStates.isGenerated = false;
  }

  mazeStates.isSolutionFound = false;

  mazeStates.isGenerating = true;
  toggleBtnsDisabled();

  drawMaze();
  mazeStates.isGenerating = await grid.generateMaze(e.target.textContent);
});

pathfindingAlgosDropdown.addEventListener('click', function (e) {
  if (e.target && e.target.nodeName !== 'A') {
    pathfindingAlgosList.classList.add('is-active');
    return;
  }

  pathfindingAlgosList.classList.remove('is-active');

  if (mazeStates.isGenerating || mazeStates.isSearchingSolution) {
    return;
  }

  if (!mazeStates.isGenerated) {
    warning.show('maze');
    return;
  }

  findSolution(e.target.textContent);
});

document.addEventListener('click', (e) => {
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
});

async function findSolution(algo) {
  if (mazeStates.isSolutionFound) {
    grid.clearSolution();
    startNode.resetState(grid);
    mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx, 'spriteNormal');
    mazeStates.isSolutionFound = false;
  }

  mazeStates.isSearchingSolution = true;
  toggleBtnsDisabled();

  visualizePathfindingAlgo();
  startNode.pathCoordinates = await grid.findSolution(algo);
  if (!startNode.pathCoordinates.length) {
    mazeStates.isSearchingSolution = false;
    mazeStates.isSolutionFound = true;
    toggleBtnsDisabled();
    return;
  }

  drawSolution();
}

function drawMaze() {
  mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  grid.draw(mazeCtx);

  if (!mazeStates.isGenerating) {
    startNode.resetState(grid);
    startNode.draw(solutionCtx);

    targetNode.setPosition(grid);
    targetNode.draw(solutionCtx, 'spriteNormal');

    mazeStates.isGenerated = true;
    toggleBtnsDisabled();
    return;
  }

  requestAnimationFrame(drawMaze);
}

function visualizePathfindingAlgo() {
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

  solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  if (startNode.atExit) {
    drawStartNodeAndFootprints();
    targetNode.resetScale();
    mazeStates.isSearchingSolution = false;
    mazeStates.isSolutionFound = true;
    toggleBtnsDisabled();
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite', true);
  targetNode.setScale();
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(drawSolution);
}

function toggleBtnsDisabled() {
  mazeAlgosList.classList.toggle('disabled');
  pathfindingAlgosList.classList.toggle('disabled');
  settingsDrawer.saveBtn.disabled = !settingsDrawer.saveBtn.disabled;
}
