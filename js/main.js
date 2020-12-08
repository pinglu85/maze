import Grid from './Grid.js';
import EntranceIcon from './EntranceIcon.js';
import ExitIcon from './ExitIcon.js';
import { CELL_COLORS, FOOTPRINT_COLORS } from './constants/colors.js';
import dijkstra from './dijkstra.js';
import getOppositeDir from './utils/getOppositeDir.js';

const GRID_SIZE = 15;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const newMazeBtn = document.getElementById('new-maze-btn');
const solutionBtn = document.getElementById('solution-btn');
const mazeCanvas = document.getElementById('maze-canvas');
const solutionCanvas = document.getElementById('solution-canvas');
const mazeCtx = mazeCanvas.getContext('2d');
const solutionCtx = solutionCanvas.getContext('2d');
mazeCanvas.width = solutionCanvas.width = CANVAS_WIDTH;
mazeCanvas.height = solutionCanvas.height = CANVAS_HEIGHT;
const cellSize = Math.floor(CANVAS_WIDTH / GRID_SIZE);

const loadImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

const entranceImg = loadImage('/assets/player.png');
const exitImg = loadImage('/assets/exit.png');
const iconSize = Math.floor(cellSize - cellSize / 10);

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let grid, entranceIcon, exitIcon;

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
    drawMaze();
    isGeneratingMaze = await grid.generateMaze(mazeGenerationAlgo);
  }
});

solutionBtn.addEventListener('click', () => {
  const pathCoordinates = dijkstra(grid);
  entranceIcon.pathCoordinates = [...pathCoordinates];
  drawSolution();
});

function drawMaze() {
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
      entranceImg,
      iconSize
    );
    entranceIcon.draw(solutionCtx);

    exitIcon = new ExitIcon(
      exitCell.centerX,
      exitCell.centerY,
      exitImg,
      iconSize
    );
    exitIcon.draw(solutionCtx);
    newMazeBtn.disabled = false;
    return;
  }
  requestAnimationFrame(drawMaze);
}

function drawSolution() {
  solutionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if (entranceIcon.atExit) {
    entranceIcon.facingDir = grid.exitDir;
    entranceIcon.draw(solutionCtx);
    entranceIcon.drawFootprints(solutionCtx, FOOTPRINT_COLORS);
    return;
  }
  exitIcon.draw(solutionCtx);
  entranceIcon.move();
  entranceIcon.draw(solutionCtx);
  entranceIcon.drawFootprints(solutionCtx, FOOTPRINT_COLORS);
  requestAnimationFrame(drawSolution);
}
