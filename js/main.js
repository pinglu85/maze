import Grid from './Grid.js';
import EntranceIcon from './EntranceIcon.js';
import ExitIcon from './ExitIcon.js';
import { CELL_COLORS } from './constants/colors.js';
import dijkstra from './dijkstra.js';
import generatePathCoordinates from './generatePathCoordinates.js';
import getOppositeDir from './utils/getOppositeDir.js';

const GRID_SIZE = 15;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const newMazeBtn = document.getElementById('new-maze-btn');
const solutionBtn = document.getElementById('solution-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const cellSize = CANVAS_WIDTH / GRID_SIZE;

const loadImage = (src) => {
  const img = new Image();
  img.src = src;
  return img;
};

const entranceImg = loadImage('/assets/entrance.png');
const exitImg = loadImage('/assets/exit.png');

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let grid, entranceIcon, exitIcon;

window.addEventListener('DOMContentLoaded', () => {
  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
  grid.draw(ctx, CELL_COLORS);
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
  const path = dijkstra(grid);
  const pathCoordinates = generatePathCoordinates(path);
  ctx.lineWidth = cellSize / 4;

  pathCoordinates.forEach(({ prevDir, nextDir, coordinates }) => {
    ctx.beginPath();
    ctx.moveTo(coordinates.start.x, coordinates.start.y);
    ctx.lineTo(coordinates.middle.x, coordinates.middle.y);
    ctx.lineTo(coordinates.end.x, coordinates.end.y);
    ctx.strokeStyle = CELL_COLORS.solution;
    ctx.stroke();
  });

  entranceIcon.draw(ctx);
  exitIcon.draw(ctx);
});

function drawMaze() {
  grid.draw(ctx, CELL_COLORS);
  if (!isGeneratingMaze) {
    grid.generateMazeEntryAndExit();
    const entranceCell = grid.entranceCell;
    const exitCell = grid.exitCell;
    entranceCell.draw(ctx, CELL_COLORS);
    exitCell.draw(ctx, CELL_COLORS);

    const entranceIconCenterX = entranceCell.colIndex * cellSize + cellSize / 2;
    const entranceIconCenterY = entranceCell.rowIndex * cellSize + cellSize / 2;
    const facingDir = getOppositeDir(grid.entranceDir);
    entranceIcon = new EntranceIcon(
      entranceIconCenterX,
      entranceIconCenterY,
      facingDir,
      entranceImg,
      cellSize
    );
    entranceIcon.draw(ctx);

    const exitIconX = exitCell.colIndex * cellSize;
    const exitIconY = exitCell.rowIndex * cellSize;
    exitIcon = new ExitIcon(exitIconX, exitIconY, exitImg, cellSize);
    exitIcon.draw(ctx);

    newMazeBtn.disabled = false;
    return;
  }
  requestAnimationFrame(drawMaze);
}
