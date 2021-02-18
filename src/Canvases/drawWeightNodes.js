import weightNodes from '../WeightNodes';
import { SPRITE_SIZE } from '../constants/size';

let isDrawing = false;
let previousTime;
let scale;

function drawWeightNodes(
  cell,
  canvasSize,
  mazeCtx,
  weightNodesCtx,
  solutionCtx
) {
  if (isDrawing) {
    return;
  }

  const { weight, centerX, centerY } = cell;
  isDrawing = true;

  if (weight === 1) {
    weightNodes.deleteWeightNode(centerX, centerY);
    weightNodesCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    weightNodes.draw(weightNodesCtx);
    isDrawing = false;
    return;
  }

  weightNodes.addWeightNode(centerX, centerY);
  previousTime = Date.now();
  scale = 0.6;
  cell.clearFillRect(mazeCtx);
  clearFootprint(solutionCtx, centerX, centerY);
  animatedDrawWeightNodes(weightNodesCtx, canvasSize);
}

function animatedDrawWeightNodes(ctx, canvasSize) {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  const now = Date.now();
  if (now - previousTime >= 100) {
    weightNodes.draw(ctx);
    isDrawing = false;
    return;
  }
  weightNodes.draw(ctx, scale);
  scale += 0.1;
  requestAnimationFrame(() => {
    animatedDrawWeightNodes(ctx, canvasSize);
  });
}

function clearFootprint(ctx, centerX, centerY) {
  const startX = centerX - SPRITE_SIZE / 2;
  const startY = centerY - SPRITE_SIZE / 2;
  ctx.clearRect(startX, startY, SPRITE_SIZE, SPRITE_SIZE);
}

export default drawWeightNodes;
