import {
  doInitiateMazeGeneration,
  doCompleteMazeGeneration,
} from '../actionCreators';
import grid from '../../Grid';
import startNode from '../../StartNode';
import targetNode from '../../TargetNode';

async function handleGenerateMaze(store, mazeCtx, solutionCtx) {
  const state = store.getState();
  if (state.isMazeGenerating || state.isSearchingForSolution) {
    return;
  }

  const { gridSize, canvasSize, algo } = state;
  if (state.isMazeGenerated) {
    grid.setContent(gridSize);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  }

  store.dispatch(doInitiateMazeGeneration());

  drawMaze(store.getState, mazeCtx, solutionCtx);
  await grid.generateMaze(algo.name);
  store.dispatch(doCompleteMazeGeneration());
}

function drawMaze(getState, mazeCtx, solutionCtx) {
  const { canvasSize, isMazeGenerating } = getState();

  mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  grid.draw(mazeCtx);

  if (!isMazeGenerating) {
    startNode.resetState(grid);
    startNode.draw(solutionCtx);
    targetNode.setPosition(grid);
    targetNode.draw(solutionCtx, 'spriteNormal');
    return;
  }

  requestAnimationFrame(() => {
    drawMaze(getState, mazeCtx, solutionCtx);
  });
}

export default handleGenerateMaze;
