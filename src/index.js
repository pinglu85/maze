import Grid from './Grid';
import StartNode from './StartNode';
import TargetNode from './TargetNode';
import warning from './Warning';
import {
  loadStartNodeSprites,
  loadTargetNodeSprites,
  setupCanvases,
  updateInputs,
  parseInputValue,
  setDefaultGridSize,
} from './utils';
import { CELL_COLORS, FOOTPRINT_COLORS } from './constants/colors';
import { CELL_SIZE, SPRITE_SIZE, LINE_WIDTH } from './constants/size';
import './index.css';

const changeGridSizeBtn = document.getElementById('change-grid-size-btn');
const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const newMazeBtn = document.getElementById('new-maze-btn');
const pathfindingAlgosDropdown = document.getElementById(
  'pathfinding-algos-dropdown'
);
const pathfindingAlgosList = document.getElementById('pathfinding-algos-list');

const [[mazeCtx, solutionCtx], setCanvasesSize] = setupCanvases();

const grid = new Grid(CELL_SIZE, CELL_COLORS, LINE_WIDTH);
const startNodeSprites = loadStartNodeSprites(10);
const startNode = new StartNode(startNodeSprites, SPRITE_SIZE);
const targetNodeSprites = loadTargetNodeSprites('normal', 'white');
const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);

let numOfCols = 0;
let numOfRows = 0;
let canvasWidth = 0;
let canvasHeight = 0;

let mazeAlgo = '';
let isGeneratingMaze = false;
let isMazeGenerated = false;
let isSearchingSolution = false;
let isSolutionFound = false;

window.addEventListener('DOMContentLoaded', () => {
  const defaultGridSize = setDefaultGridSize();
  numOfCols = defaultGridSize.numOfCols;
  numOfRows = defaultGridSize.numOfRows;

  updateInputs(numOfCols, numOfRows);

  const canvasSize = setCanvasesSize(
    numOfCols,
    numOfRows,
    CELL_SIZE,
    LINE_WIDTH
  );
  canvasWidth = canvasSize.canvasWidth;
  canvasHeight = canvasSize.canvasHeight;

  grid.setContent(numOfCols, numOfRows);
  grid.draw(mazeCtx);
});

changeGridSizeBtn.addEventListener('click', function () {
  const newNumOfRows = parseInputValue('rows');
  if (!newNumOfRows) {
    warning.show('rows');
    return;
  }

  const newNumOfCols = parseInputValue('cols');
  if (!newNumOfCols) {
    warning.show('columns');
    return;
  }

  if (newNumOfCols === numOfCols && newNumOfRows === numOfRows) {
    return;
  }

  numOfCols = newNumOfCols;
  numOfRows = newNumOfRows;

  const canvasSize = setCanvasesSize(
    numOfCols,
    numOfRows,
    CELL_SIZE,
    LINE_WIDTH
  );
  canvasWidth = canvasSize.canvasWidth;
  canvasHeight = canvasSize.canvasHeight;

  grid.setContent(numOfCols, numOfRows);
  grid.draw(mazeCtx);
  isMazeGenerated = false;
  isSolutionFound = false;
});

mazeAlgosDropdown.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'A') {
    if (!isGeneratingMaze && !isSearchingSolution) {
      mazeAlgo = e.target.textContent;
      newMazeBtn.textContent =
        mazeAlgo === 'Open Grid' ? 'Open Grid' : `New Maze with ${mazeAlgo}`;
    }
    mazeAlgosList.classList.remove('is-active');
  } else {
    mazeAlgosList.classList.add('is-active');
  }
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

newMazeBtn.addEventListener('click', async function () {
  if (!mazeAlgo) {
    warning.show('algorithm');
    return;
  }

  if (isMazeGenerated) {
    grid.setContent(numOfCols, numOfRows);
    solutionCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    isMazeGenerated = false;
  }

  isSolutionFound = false;

  isGeneratingMaze = true;
  toggleBtnsIsDisabled();

  drawMaze();
  isGeneratingMaze = await grid.generateMaze(mazeAlgo);
});

pathfindingAlgosDropdown.addEventListener('click', function (e) {
  if (e.target && e.target.nodeName !== 'A') {
    pathfindingAlgosList.classList.add('is-active');
    return;
  }

  pathfindingAlgosList.classList.remove('is-active');

  if (isGeneratingMaze || isSearchingSolution) {
    return;
  }

  if (!isMazeGenerated) {
    warning.show('maze');
    return;
  }

  findSolution(e.target.textContent);
});

async function findSolution(algo) {
  if (isSolutionFound) {
    grid.clearSolution();
    startNode.reset(grid);
    mazeCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    solutionCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx, 'spriteNormal');
    isSolutionFound = false;
  }

  isSearchingSolution = true;
  toggleBtnsIsDisabled();

  visualizePathfindingAlgo();
  startNode.pathCoordinates = await grid.findSolution(algo);
  if (!startNode.pathCoordinates.length) {
    isSearchingSolution = false;
    isSolutionFound = true;
    toggleBtnsIsDisabled();
    return;
  }

  drawSolution();
}

function drawMaze() {
  mazeCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  grid.draw(mazeCtx);

  if (!isGeneratingMaze) {
    startNode.reset(grid);
    startNode.draw(solutionCtx);

    targetNode.setPosition(grid);
    targetNode.draw(solutionCtx, 'spriteNormal');

    toggleBtnsIsDisabled();
    isMazeGenerated = true;
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

  solutionCtx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (startNode.atExit) {
    drawStartNodeAndFootprints();
    targetNode.resetScale();
    isSearchingSolution = false;
    isSolutionFound = true;
    toggleBtnsIsDisabled();
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite', true);
  targetNode.setScale();
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(drawSolution);
}

function toggleBtnsIsDisabled() {
  newMazeBtn.disabled = !newMazeBtn.disabled;
  changeGridSizeBtn.disabled = !changeGridSizeBtn.disabled;
}
