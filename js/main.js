import Grid from './Grid.js';

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
let isTicking = false;
let grid;

window.addEventListener('DOMContentLoaded', () => {
  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
  grid.draw(ctx);
});

mazeAlgosDropdown.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'A') {
    if (!isTicking) mazeGenerationAlgo = e.target.textContent;
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

newMazeBtn.addEventListener('click', function () {
  if (!mazeGenerationAlgo) {
    this.textContent = 'Pick an algorithm!';
    return;
  }
  if (!isTicking) {
    isTicking = true;
    this.disabled = true;
    grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
    grid.generateMaze(mazeGenerationAlgo);
    grid.draw(ctx);
    drawMaze();
  }
});

function drawMaze() {
  grid.draw(ctx);
  const mazeGenerationFinished = grid.content.every((row) =>
    row.every((col) => col.isVisited && !col.isStartCell)
  );
  if (mazeGenerationFinished) {
    isTicking = false;
    newMazeBtn.disabled = false;
    return;
  }
  requestAnimationFrame(drawMaze);
}
