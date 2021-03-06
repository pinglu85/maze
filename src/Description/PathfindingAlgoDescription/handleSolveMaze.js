import {
  doInitiateSolvingProcess,
  doCompleteSolvingProcess,
} from '../actionCreators';
import grid from '../../Grid';
import startNode from '../../StartNode';
import targetNode from '../../TargetNode';

function handleSolveMaze(store, mazeCtx, solutionCtx) {
  const state = store.getState();
  if (state.isMazeGenerating || state.isSearchingForSolution) {
    return;
  }

  findSolution(store, mazeCtx, solutionCtx);
}

async function findSolution(store, mazeCtx, solutionCtx) {
  const { canvasSize, algo, isSolutionFound } = store.getState();

  if (isSolutionFound) {
    grid.clearSolution();
    startNode.resetState(grid);
    mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx, 'spriteNormal');
  }

  store.dispatch(doInitiateSolvingProcess());

  visualizePathfindingAlgo(mazeCtx);
  startNode.pathCoordinates = await grid.findSolution(algo.name);
  if (!startNode.pathCoordinates.length) {
    store.dispatch(doCompleteSolvingProcess());
    return;
  }

  drawSolution(store.dispatch, canvasSize, solutionCtx);
}

function visualizePathfindingAlgo(mazeCtx) {
  grid.draw(mazeCtx);

  const isPathFound = startNode.pathCoordinates.length > 0;
  if (isPathFound) {
    return;
  }

  requestAnimationFrame(() => {
    visualizePathfindingAlgo(mazeCtx);
  });
}

function drawSolution(dispatch, canvasSize, solutionCtx) {
  const drawStartNodeAndFootprints = () => {
    startNode.draw(solutionCtx);
    startNode.drawFootprints(solutionCtx);
  };

  solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  if (startNode.atExit) {
    drawStartNodeAndFootprints();
    targetNode.resetScale();
    dispatch(doCompleteSolvingProcess());
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite', true);
  targetNode.setScale();
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(() => {
    drawSolution(dispatch, canvasSize, solutionCtx);
  });
}

export default handleSolveMaze;
