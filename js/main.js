import Grid from './Grid.js';
import StartNode from './StartNode.js';
import TargetNode from './TargetNode.js';
import dijkstra from './dijkstra.js';
import getOppositeDir from './utils/getOppositeDir.js';
import loadSprite from './utils/loadImg.js';
import setCanvasesSize from './utils/setCanvasesSize.js';
import { CELL_COLORS, FOOTPRINT_COLORS } from './constants/colors.js';
import {
  CELL_SIZE,
  SPRITE_SIZE,
  MIN_GRID_SIZE,
  MAX_GRID_SIZE,
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
const canvases = [mazeCanvas, solutionCanvas];

const canvasWrapper = document.getElementById('canvas-wrapper');
const inputCols = document.getElementById('cols');
const inputRows = document.getElementById('rows');
let numOfCols, numOfRows, canvasWidth, canvasHeight;

const startNodeSprites = Array.from(new Array(10), (_, i) =>
  loadSprite(`/assets/start-node-${i}.png`)
);
const targetNodeSprites = ['normal', 'white'].map((option) =>
  loadSprite(`/assets/target-node-${option}.png`)
);

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let isMazeGenerated = false;
let isSearchingSolution = false;
let isSolutionFound = false;
let grid, startNode, targetNode, pathCoordinates, startNodeFacingDir;

window.addEventListener('DOMContentLoaded', () => {
  if (window.matchMedia('(max-width: 577px)').matches) {
    numOfCols = 10;
    numOfRows = 8;
  } else if (window.matchMedia('(max-width: 769px').matches) {
    numOfCols = 25;
    numOfRows = 15;
  } else {
    numOfCols = 40;
    numOfRows = 16;
  }

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

  grid = new Grid(numOfCols, numOfRows, CELL_SIZE, CELL_COLORS);
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

  grid = new Grid(numOfCols, numOfRows, CELL_SIZE, CELL_COLORS);
  grid.draw(mazeCtx);
  isMazeGenerated = false;
  isSolutionFound = false;
  pathCoordinates = null;
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
    grid = new Grid(numOfCols, numOfRows, CELL_SIZE, CELL_COLORS);
    solutionCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    isMazeGenerated = false;
  }

  pathCoordinates = null;
  isSolutionFound = false;

  isGeneratingMaze = true;
  this.disabled = true;
  solutionBtn.textContent = 'Solution';
  solutionBtn.disabled = true;
  changeGridSizeBtn.disabled = true;

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
    solutionCtx.clearRect(0, 0, canvasWidth, canvasHeight);
    startNode.reset(
      grid.entranceCell.centerX,
      grid.entranceCell.centerY,
      startNodeFacingDir
    );
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx);
    pathCoordinates = null;
    isSolutionFound = false;
  }

  isSearchingSolution = true;
  this.disabled = true;
  newMazeBtn.disabled = true;
  changeGridSizeBtn.disabled = true;

  visualizePathFindingAlgo();
  pathCoordinates = await dijkstra(grid);
  startNode.pathCoordinates = [...pathCoordinates];
  drawSolution();
});

function drawMaze() {
  mazeCtx.clearRect(0, 0, canvasWidth, canvasHeight);
  grid.draw(mazeCtx);

  if (!isGeneratingMaze) {
    grid.generateMazeEntryAndExit();
    const entranceCell = grid.entranceCell;
    const exitCell = grid.exitCell;
    entranceCell.draw(mazeCtx);
    exitCell.draw(mazeCtx);

    startNodeFacingDir = getOppositeDir(grid.entranceDir);
    startNode = new StartNode(
      entranceCell.centerX,
      entranceCell.centerY,
      startNodeFacingDir,
      grid.exitDir,
      startNodeSprites,
      SPRITE_SIZE
    );
    startNode.draw(solutionCtx);

    targetNode = new TargetNode(
      exitCell.centerX,
      exitCell.centerY,
      targetNodeSprites,
      SPRITE_SIZE
    );
    targetNode.draw(solutionCtx);

    newMazeBtn.disabled = false;
    solutionBtn.disabled = false;
    changeGridSizeBtn.disabled = false;
    isMazeGenerated = true;
    return;
  }

  requestAnimationFrame(drawMaze);
}

function visualizePathFindingAlgo() {
  grid.draw(mazeCtx);

  if (pathCoordinates) {
    targetNode.draw(solutionCtx, 'spriteWhite');
    return;
  }

  requestAnimationFrame(visualizePathFindingAlgo);
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
    newMazeBtn.disabled = false;
    solutionBtn.disabled = false;
    changeGridSizeBtn.disabled = false;
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite');
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(drawSolution);
}
