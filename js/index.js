import Grid from './Grid.js';
import StartNode from './StartNode.js';
import TargetNode from './TargetNode.js';
import {
  loadSprite,
  setupCanvases,
  setDefaultGridSize,
} from './utils/index.js';
import showWarning from './ui/toggleWarning.js';
import { CELL_COLORS, FOOTPRINT_COLORS } from './constants/colors.js';
import {
  CELL_SIZE,
  SPRITE_SIZE,
  MIN_GRID_SIZE,
  MAX_GRID_SIZE,
  LINE_WIDTH,
} from './constants/size.js';

const changeGridSizeBtn = document.getElementById('change-grid-size-btn');
const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const newMazeBtn = document.getElementById('new-maze-btn');
const pathfindingAlgosDropdown = document.getElementById(
  'pathfinding-algos-dropdown'
);
const pathfindingAlgosList = document.getElementById('pathfinding-algos-list');

const canvasWrapper = document.getElementById('canvas-wrapper');
const mazeCanvas = document.getElementById('maze-canvas');
const solutionCanvas = document.getElementById('solution-canvas');
const [[mazeCtx, solutionCtx], setCanvasesSize] = setupCanvases(
  canvasWrapper,
  mazeCanvas,
  solutionCanvas
);

const grid = new Grid(CELL_SIZE, CELL_COLORS, LINE_WIDTH);
const startNodeSprites = Array.from(new Array(10), (_, i) =>
  loadSprite(`./assets/start-node-${i}.png`)
);
const startNode = new StartNode(startNodeSprites, SPRITE_SIZE);
const targetNodeSprites = ['normal', 'white'].map((option) =>
  loadSprite(`./assets/target-node-${option}.png`)
);
const targetNode = new TargetNode(targetNodeSprites, SPRITE_SIZE);

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

[inputRows, inputCols].forEach((input) => {
  input.addEventListener('input', (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    if (e.target.id === 'rows') {
      numOfRows = value;
      inputRows.value = value;
    } else {
      numOfCols = value;
      inputCols.value = value;
    }
  });
});

changeGridSizeBtn.addEventListener('click', function () {
  const isNumOfRowsWithinRange =
    numOfRows >= MIN_GRID_SIZE && numOfRows <= MAX_GRID_SIZE;
  if (!isNumOfRowsWithinRange) {
    showWarning('rows');
    return;
  }

  const isNumOfColsWithinRange =
    numOfCols >= MIN_GRID_SIZE && numOfCols <= MAX_GRID_SIZE;
  if (!isNumOfColsWithinRange) {
    showWarning('columns');
    return;
  }

  if (
    numOfCols === grid.content[0].length &&
    numOfRows === grid.content.length
  ) {
    return;
  }

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
      mazeGenerationAlgo = e.target.textContent;
      newMazeBtn.textContent = `New Maze with ${mazeGenerationAlgo}`;
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
  if (!mazeGenerationAlgo) {
    showWarning('algorithm');
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
  isGeneratingMaze = await grid.generateMaze(mazeGenerationAlgo);
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
    showWarning('maze');
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
