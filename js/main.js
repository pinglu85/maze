import Grid from './Grid.js';
import EntranceIcon from './EntranceIcon.js';
import ExitIcon from './ExitIcon.js';
import dijkstra from './dijkstra.js';
import getOppositeDir from './utils/getOppositeDir.js';
import loadImg from './utils/loadImg.js';
import { CELL_COLORS, FOOTPRINT_COLORS } from './constants/colors.js';

const GRID_SIZE = 15;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const newMazeBtn = document.getElementById('new-maze-btn');
const solutionBtn = document.getElementById('solution-btn');
const mazeCanvas = document.getElementById('maze-canvas');
const mazeCtx = mazeCanvas.getContext('2d');
const solutionCanvas = document.getElementById('solution-canvas');
const solutionCtx = solutionCanvas.getContext('2d');
mazeCanvas.width = solutionCanvas.width = CANVAS_WIDTH;
mazeCanvas.height = solutionCanvas.height = CANVAS_HEIGHT;
const cellSize = Math.floor(CANVAS_WIDTH / GRID_SIZE);

const entranceImgs = Array.from(new Array(10), (_, i) =>
  loadImg(`/assets/player${i}.png`)
);
const exitImg = loadImg('/assets/exit.png');
const exitImgWhite = loadImg('/assets/exit-white.png');
const iconSize = Math.floor(cellSize - cellSize / 10);

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let isMazeGenerated = false;
let isSearchingSolution = false;
let isSolutionFound = false;
let grid, entranceIcon, exitIcon, pathCoordinates;

window.addEventListener('DOMContentLoaded', () => {
  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize, CELL_COLORS);
  grid.draw(mazeCtx);
});

mazeAlgosDropdown.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'A') {
    if (!isGeneratingMaze && !isSearchingSolution) {
      mazeGenerationAlgo = e.target.textContent;
    }
    newMazeBtn.textContent = `New Maze with ${mazeGenerationAlgo}`;
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

  isGeneratingMaze = true;
  isMazeGenerated = false;
  isSolutionFound = false;
  this.disabled = true;
  solutionBtn.textContent = 'Solution';
  solutionBtn.disabled = true;

  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize, CELL_COLORS);
  solutionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
  pathCoordinates = null;
  drawMaze();
  isGeneratingMaze = await grid.generateMaze(mazeGenerationAlgo);
});

solutionBtn.addEventListener('click', async function () {
  if (!isMazeGenerated) {
    this.textContent = 'Generate a maze!';
    return;
  }
  if (isSolutionFound) {
    this.textContent = 'Solution is found!';
    return;
  }

  isSearchingSolution = true;
  this.disabled = true;
  newMazeBtn.disabled = true;

  visualizePathFindingAlgo();
  pathCoordinates = await dijkstra(grid);
  entranceIcon.pathCoordinates = [...pathCoordinates];
  drawSolution();
});

function drawMaze() {
  mazeCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  grid.draw(mazeCtx);

  if (!isGeneratingMaze) {
    grid.generateMazeEntryAndExit();
    const entranceCell = grid.entranceCell;
    const exitCell = grid.exitCell;
    entranceCell.draw(mazeCtx);
    exitCell.draw(mazeCtx);

    const facingDir = getOppositeDir(grid.entranceDir);
    entranceIcon = new EntranceIcon(
      entranceCell.centerX,
      entranceCell.centerY,
      facingDir,
      grid.exitDir,
      entranceImgs,
      iconSize
    );
    entranceIcon.draw(solutionCtx);

    exitIcon = new ExitIcon(
      exitCell.centerX,
      exitCell.centerY,
      exitImg,
      exitImgWhite,
      iconSize
    );
    exitIcon.draw(solutionCtx);

    newMazeBtn.disabled = false;
    solutionBtn.disabled = false;
    isMazeGenerated = true;
    return;
  }

  requestAnimationFrame(drawMaze);
}

function visualizePathFindingAlgo() {
  grid.draw(mazeCtx);

  if (pathCoordinates) {
    exitIcon.draw(solutionCtx, true);
    return;
  }

  requestAnimationFrame(visualizePathFindingAlgo);
}

function drawSolution() {
  solutionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  entranceIcon.move();
  entranceIcon.draw(solutionCtx);
  entranceIcon.drawFootprints(solutionCtx, FOOTPRINT_COLORS);

  if (entranceIcon.atExit) {
    isSearchingSolution = false;
    isSolutionFound = true;
    newMazeBtn.disabled = false;
    solutionBtn.disabled = false;
    return;
  }

  exitIcon.draw(solutionCtx, true);

  requestAnimationFrame(drawSolution);
}
