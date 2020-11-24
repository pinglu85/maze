import Grid from './Grid.js';

const GRID_SIZE = 30;
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
let grid;

window.addEventListener('DOMContentLoaded', () => {
  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
  grid.draw(ctx);
});

mazeAlgosDropdown.addEventListener('click', (e) => {
  if (e.target && e.target.nodeName === 'BUTTON') {
    mazeAlgosList.classList.add('is-active');
  } else if (e.target && e.target.nodeName === 'A') {
    mazeGenerationAlgo = e.target.textContent;
    const newMazeBtnLabel = newMazeBtn.textContent;
    newMazeBtn.textContent = `${newMazeBtnLabel} with ${mazeGenerationAlgo}`;
    mazeAlgosList.classList.remove('is-active');
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
    alert('Pick an algorithm!');
    return;
  }
  grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
  grid.generateMaze(mazeGenerationAlgo);
  grid.draw(ctx);
});
