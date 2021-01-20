import { generatingNewMaze, mazeGenerated } from '../../store/actions';
import grid from '../../Grid';
import startNode from '../../StartNode';
import targetNode from '../../TargetNode';

async function handleVisualize(getState, dispatch, mazeCtx, solutionCtx) {
  const state = getState();
  if (state.isMazeGenerating || state.isSearchingSolution) {
    return;
  }

  const { gridSize, canvasSize, mazeAlgo } = state;
  if (state.isMazeGenerated) {
    grid.setContent(gridSize);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  }

  dispatch(generatingNewMaze());

  drawMaze(getState, mazeCtx, solutionCtx);
  await grid.generateMaze(mazeAlgo);
  dispatch(mazeGenerated());
}

function drawMaze(getState, mazeCtx, solutionCtx) {
  const { canvasSize, mazeAlgo, isMazeGenerating } = getState();
  mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  if (mazeAlgo === 'Open Grid') {
    grid.drawGuides(mazeCtx);
  }
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

export default handleVisualize;
