import {
  togglePopupWarning,
  searchingSolution,
  solutionFound,
} from '../../store/actions';
import grid from '../../Grid';
import startNode from '../../StartNode';
import targetNode from '../../TargetNode';

function handleVisualize(store, mazeCtx, solutionCtx) {
  const state = store.getState();
  if (state.isMazeGenerating || state.isSearchingSolution) {
    return;
  }

  if (!state.isMazeGenerated) {
    store.dispatch(togglePopupWarning('generate a maze'));
    return;
  }

  findSolution(store, mazeCtx, solutionCtx);
}

async function findSolution(store, mazeCtx, solutionCtx) {
  const {
    mazeAlgo,
    pathfindingAlgo,
    canvasSize,
    isSolutionFound,
  } = store.getState();

  if (isSolutionFound) {
    grid.clearSolution();
    startNode.resetState(grid);
    mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx, 'spriteNormal');
  }

  store.dispatch(searchingSolution());

  visualizePathfindingAlgo(mazeAlgo, mazeCtx);
  startNode.pathCoordinates = await grid.findSolution(pathfindingAlgo);
  if (!startNode.pathCoordinates.length) {
    store.dispatch(solutionFound(store.dispatch, canvasSize, solutionCtx));
    return;
  }

  drawSolution(store.dispatch, canvasSize, solutionCtx);
}

function visualizePathfindingAlgo(mazeAlgo, mazeCtx) {
  if (mazeAlgo === 'Open Grid') {
    grid.drawGuides(mazeCtx);
  }
  grid.draw(mazeCtx);

  const isPathFound = startNode.pathCoordinates.length > 0;
  if (isPathFound) {
    return;
  }

  requestAnimationFrame(() => {
    visualizePathfindingAlgo(mazeAlgo, mazeCtx);
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
    dispatch(solutionFound());
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

export default handleVisualize;
