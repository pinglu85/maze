import Grid from './Grid.js';
import StartNode from './StartNode.js';
import TargetNode from './TargetNode.js';
import dijkstra from './dijkstra.js';
import {
  loadSprite,
  setCanvasesSize,
  setDefaultGridSize,
} from './utils/index.js';
import {
  CELL_COLORS,
  FOOTPRINT_COLORS,
  GRID_GUIDES_COLOR,
} from './constants/colors.js';
import {
  CELL_SIZE,
  SPRITE_SIZE,
  MIN_GRID_SIZE,
  MAX_GRID_SIZE,
  LINE_WIDTH,
} from './constants/size.js';

const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const newMazeBtn = document.getElementById('new-maze-btn');
const solutionBtn = document.getElementById('solution-btn');
const changeGridSizeBtn = document.getElementById('change-grid-size-btn');
const mazeCanvas = document.getElementById('maze-canvas');
const mazeCtx = mazeCanvas.getContext('2d');
const solutionCanvas = document.getElementById('solution-canvas');
const solutionCtx = solutionCanvas.getContext('2d');
const grid = new Grid(CELL_SIZE, CELL_COLORS, LINE_WIDTH, GRID_GUIDES_COLOR);

const startNodeSprites = Array.from(new Array(10), (_, i) =>
  loadSprite(`/assets/start-node-${i}.png`)
);
const startNode = new StartNode(startNodeSprites, SPRITE_SIZE);

const targetNodeSprites = ['normal', 'white'].map((option) =>
  loadSprite(`/assets/target-node-${option}.png`)
);
const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);

const canvases = [mazeCanvas, solutionCanvas];
const canvasWrapper = document.getElementById('canvas-wrapper');
const inputCols = document.getElementById('cols');
const inputRows = document.getElementById('rows');
let numOfCols, numOfRows, canvasWidth, canvasHeight;

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let isMazeGenerated = false;
let isSearchingSolution = false;
let isSolutionFound = false;

window.addEventListener('DOMContentLoaded', () => {
  const defaultGridSize = setDefaultGridSize();
  numOfCols = defaultGridSize.numOfCols;
  numOfRows = defaultGridSize.numOfRows;

  inputCols.value = numOfCols;
  inputRows.value = numOfRows;
  const canvasSize = setCanvasesSize(
    canvases,
    numOfCols,
    numOfRows,
    CELL_SIZE,
    canvasWrapper
  );
  canvasWidth = canvasSize.canvasWidth;
  canvasHeight = canvasSize.canvasHeight;

  grid.setContent(numOfCols, numOfRows);
  grid.draw(mazeCtx);
});

changeGridSizeBtn.addEventListener('click', function () {
  const _numOfCols = parseInt(inputCols.value);
  const _numOfRows = parseInt(inputRows.value);
  const isNumOfColsWithinRange =
    _numOfCols >= MIN_GRID_SIZE && _numOfCols <= MAX_GRID_SIZE;
  const isNumOfRowsWithinRange =
    _numOfRows >= MIN_GRID_SIZE && _numOfRows <= MAX_GRID_SIZE;

  if (!isNumOfColsWithinRange || !isNumOfRowsWithinRange) {
    this.textContent = 'Enter a valid number!';
    setTimeout(() => {
      changeGridSizeBtn.textContent = 'Change Grid Size';
    }, 2500);
    return;
  }

  if (_numOfCols === numOfCols && _numOfRows === numOfRows) {
    return;
  }

  numOfCols = _numOfCols;
  numOfRows = _numOfRows;
  const canvasSize = setCanvasesSize(
    canvases,
    numOfCols,
    numOfRows,
    CELL_SIZE,
    canvasWrapper
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
      mazeGenerationAlgo = e.target.textContent;
      newMazeBtn.textContent = `New Maze with ${mazeGenerationAlgo}`;
    }
    mazeAlgosList.classList.remove('is-active');
  } else {
    mazeAlgosList.classList.add('is-active');
  }
});

document.addEventListener('click', (e) => {
  const mazeAlgosListIsShown = mazeAlgosList.classList.contains('is-active');
  const mazeAlgosDropdownIsClicked = mazeAlgosDropdown.contains(e.target);
  if (mazeAlgosListIsShown && !mazeAlgosDropdownIsClicked) {
    mazeAlgosList.classList.remove('is-active');
  }
});

newMazeBtn.addEventListener('click', async function () {
  if (!mazeGenerationAlgo) {
    this.textContent = 'Pick an algorithm!';
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
  solutionBtn.textContent = 'Solution';

  drawMaze();
  isGeneratingMaze = await grid.generateMaze(mazeGenerationAlgo);
});

solutionBtn.addEventListener('click', async function () {
  if (!isMazeGenerated) {
    this.textContent = 'Generate a maze!';
    return;
  }

  if (isSolutionFound) {
    grid.clearSolution();
    startNode.reset(grid);
    mazeCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    solutionCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx);
    isSolutionFound = false;
  }

  isSearchingSolution = true;
  toggleBtnsIsDisabled();

  visualizePathfindingAlgo();
  startNode.pathCoordinates = await dijkstra(grid);
  if (!startNode.pathCoordinates.length) {
    isSearchingSolution = false;
    isSolutionFound = true;
    toggleBtnsIsDisabled();
    return;
  }

  drawSolution();
});

function drawMaze() {
  mazeCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  if (mazeGenerationAlgo === 'Recursive Division' && isGeneratingMaze) {
    grid.drawGuides(mazeCtx);
  }
  grid.draw(mazeCtx);

  if (!isGeneratingMaze) {
    startNode.reset(grid);
    startNode.draw(solutionCtx);

    targetNode.setPosition(grid);
    targetNode.draw(solutionCtx);

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
    targetNode.draw(solutionCtx, 'spriteWhite');
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
    isSearchingSolution = false;
    isSolutionFound = true;
    toggleBtnsIsDisabled();
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite');
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(drawSolution);
}

function toggleBtnsIsDisabled() {
  newMazeBtn.disabled = !newMazeBtn.disabled;
  solutionBtn.disabled = !solutionBtn.disabled;
  changeGridSizeBtn.disabled = !changeGridSizeBtn.disabled;
}
