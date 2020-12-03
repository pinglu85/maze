import Grid from './Grid.js';
import drawEntranceSymbol from './drawEntranceSymbol.js';
import drawExitSymbol from './drawExitSymbol.js';
import { CELL_COLORS, SYMBOL_COLOR } from './constants/colors.js';
import dijkstra from './dijkstra.js';

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

let mazeGenerationAlgo = '';
let isGeneratingMaze = false;
let grid;

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
  path.forEach(({ cell, previousDir, nextDir }) => {
    cell.drawSolution(ctx, previousDir, nextDir, CELL_COLORS.solution);
  });
  drawEntranceSymbol(ctx, grid, SYMBOL_COLOR);
  drawExitSymbol(ctx, grid, SYMBOL_COLOR);
  ctx.strokeStyle = CELL_COLORS.border;
});

function drawMaze() {
  grid.draw(ctx, CELL_COLORS);
  if (!isGeneratingMaze) {
    grid.generateMazeEntryAndExit();
    grid.entranceCell.draw(ctx, CELL_COLORS);
    grid.exitCell.draw(ctx, CELL_COLORS);
    drawEntranceSymbol(ctx, grid, SYMBOL_COLOR);
    drawExitSymbol(ctx, grid, SYMBOL_COLOR);
    ctx.strokeStyle = CELL_COLORS.border;
    newMazeBtn.disabled = false;
    return;
  }
  requestAnimationFrame(drawMaze);
}
