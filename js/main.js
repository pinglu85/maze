import Grid from './Grid.js';
import drawEntrySymbol from './drawEntrySymbol.js';
import drawExitSymbol from './drawExitSymbol.js';

const GRID_SIZE = 15;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

const mazeAlgosDropdown = document.getElementById('maze-algos-dropdown');
const mazeAlgosList = document.getElementById('maze-algos-list');
const newMazeBtn = document.getElementById('new-maze-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const cellSize = CANVAS_WIDTH / GRID_SIZE;

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let grid;

window.addEventListener('DOMContentLoaded', () => {
  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
  grid.draw(ctx);
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

function drawMaze() {
  grid.draw(ctx);
  if (!isGeneratingMaze) {
    grid.generateMazeEntryAndExit();
    const entryCell = grid.entryCell;
    const exitCell = grid.exitCell;
    entryCell.draw(ctx);
    exitCell.draw(ctx);

    drawEntrySymbol(
      ctx,
      entryCell.rowIndex,
      entryCell.colIndex,
      grid.entryDir,
      cellSize
    );
    drawExitSymbol(ctx, exitCell.rowIndex, exitCell.colIndex, cellSize);

    newMazeBtn.disabled = false;
    return;
  }
  requestAnimationFrame(drawMaze);
}
