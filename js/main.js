import Grid from './Grid.js';

const GRID_SIZE = 30;
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 300;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
const cellSize = CANVAS_WIDTH / GRID_SIZE;

const grid = new Grid(GRID_SIZE, GRID_SIZE, cellSize);
grid.generateMaze();
grid.draw(ctx);
