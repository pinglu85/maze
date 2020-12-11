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

const entranceImgs = Array.from(new Array(7), (_, i) =>
  loadImg(`/assets/player${i}.png`)
);
const exitImg = loadImg('/assets/exit.png');
const exitImgWhite = loadImg('/assets/exit-white.png');
const iconSize = Math.floor(cellSize - cellSize / 10);

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let grid, entranceIcon, exitIcon, pathCoordinates;

window.addEventListener('DOMContentLoaded', () => {
  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
  grid.draw(mazeCtx, CELL_COLORS);
});

mazeAlgosDropdown.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'A') {
    if (!isGeneratingMaze) mazeGenerationAlgo = e.target.textContent;
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
  if (!isGeneratingMaze) {
    isGeneratingMaze = true;
    this.disabled = true;
    grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
    solutionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
    drawMaze();
    isGeneratingMaze = await grid.generateMaze(mazeGenerationAlgo);
  }
});

solutionBtn.addEventListener('click', async () => {
  visualizeFindSolution();
  pathCoordinates = await dijkstra(grid);
  entranceIcon.pathCoordinates = [...pathCoordinates];
  drawSolution();
});

function drawMaze() {
  mazeCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  grid.draw(mazeCtx, CELL_COLORS);
  if (!isGeneratingMaze) {
    grid.generateMazeEntryAndExit();
    const entranceCell = grid.entranceCell;
    const exitCell = grid.exitCell;
    entranceCell.draw(mazeCtx, CELL_COLORS);
    exitCell.draw(mazeCtx, CELL_COLORS);

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
    return;
  }
  requestAnimationFrame(drawMaze);
}

function visualizeFindSolution() {
  grid.draw(mazeCtx, CELL_COLORS);
  if (pathCoordinates) {
    // grid.exitCell.draw(mazeCtx, CELL_COLORS);
    exitIcon.draw(solutionCtx, true);
    return;
  }
  requestAnimationFrame(visualizeFindSolution);
}

function drawSolution() {
  solutionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  entranceIcon.move();
  entranceIcon.draw(solutionCtx);
  entranceIcon.drawFootprints(solutionCtx, FOOTPRINT_COLORS);
  if (entranceIcon.atExit) {
    return;
  }
  exitIcon.draw(solutionCtx, true);
  requestAnimationFrame(drawSolution);
}
