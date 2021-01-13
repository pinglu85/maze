import { grid, startNode, targetNode } from './globalVariables';
import navbar from './Navbar';
import popupWarning from './PopupWarning';
import settingsDrawer from './SettingsDrawer';
import description from './Description';
import store from './store';
import * as actions from './store/actions';
import { setupCanvases, setInitialGridSize } from './utils';
import './index.css';

const [[mazeCtx, solutionCtx], setCanvasesSize] = setupCanvases();

const redrawGridOnSizeChange = (prevState, state) => {
  const { gridSize: prevGridSize } = prevState;
  const { gridSize } = state;
  if (
    prevGridSize.numOfRows !== gridSize.numOfRows ||
    prevGridSize.numOfCols !== gridSize.numOfCols
  ) {
    setCanvasesSize(state.canvasSize);
    grid.setContent(gridSize);
    grid.draw(mazeCtx);
  }
};
store.subscribe(redrawGridOnSizeChange);

const toggleBtnsDisabledOnStateChange = (prevState, state) => {
  if (
    prevState.isMazeGenerating !== state.isMazeGenerating ||
    prevState.isSearchingSolution !== state.isSearchingSolution
  ) {
    const mazeAlgoMenu = navbar.mazeAlgoMenu;
    mazeAlgoMenu.classList.toggle('disabled');

    const pathfindingAlgoMenu = navbar.pathfindingAlgoMenu;
    pathfindingAlgoMenu.classList.toggle('disabled');

    settingsDrawer.saveBtn.disabled = !settingsDrawer.saveBtn.disabled;
    if (description.visualizeBtn) {
      description.visualizeBtn.disabled = !description.visualizeBtn.disabled;
    }
  }
};
store.subscribe(toggleBtnsDisabledOnStateChange);

const renderDescriptionOnAlgoSelect = (prevState, state) => {
  if (prevState.algoType !== state.algoType) {
    const currAlgoType = state.algoType;
    const algo = state[currAlgoType];
    const handleVisualize =
      currAlgoType === 'mazeAlgo'
        ? handleVisualizeMazeAlgo
        : handleVisualizePathfindingAlgo;
    description.render(algo, handleVisualize);
    return;
  }

  if (prevState.mazeAlgo !== state.mazeAlgo) {
    description.render(state.mazeAlgo, handleVisualizeMazeAlgo);
    return;
  }

  if (prevState.pathfindingAlgo !== state.pathfindingAlgo) {
    description.render(state.pathfindingAlgo, handleVisualizePathfindingAlgo);
  }
};
store.subscribe(renderDescriptionOnAlgoSelect);

window.addEventListener('DOMContentLoaded', () => {
  setInitialGridSize(store.dispatch);
  description.render('');
});

async function handleVisualizeMazeAlgo(algo) {
  const appState = store.getState();
  if (appState.isMazeGenerating || appState.isSearchingSolution) {
    return;
  }

  if (appState.isMazeGenerated) {
    const { gridSize, canvasSize } = appState;
    grid.setContent(gridSize);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  }

  store.dispatch(actions.generatingNewMaze());

  drawMaze();
  await grid.generateMaze(algo);
  store.dispatch(actions.mazeGenerated());
}

function handleVisualizePathfindingAlgo(algo) {
  const appState = store.getState();
  if (appState.isMazeGenerating || appState.isSearchingSolution) {
    return;
  }

  if (!appState.isMazeGenerated) {
    popupWarning.show('generate a maze');
    return;
  }

  const { canvasSize, isSolutionFound } = appState;
  findSolution(algo, canvasSize, isSolutionFound);
}

async function findSolution(algo, canvasSize, isSolutionFound) {
  if (isSolutionFound) {
    grid.clearSolution();
    startNode.resetState(grid);
    mazeCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    startNode.draw(solutionCtx);
    targetNode.draw(solutionCtx, 'spriteNormal');
  }

  store.dispatch(actions.searchingSolution());

  visualizePathfindingAlgo();
  startNode.pathCoordinates = await grid.findSolution(algo);
  if (!startNode.pathCoordinates.length) {
    store.dispatch(actions.solutionFound());
    return;
  }

  drawSolution();
}

function drawMaze() {
  const { isMazeGenerating, canvasSize, mazeAlgo } = store.getState();
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

  requestAnimationFrame(drawMaze);
}

function visualizePathfindingAlgo() {
  const { mazeAlgo } = store.getState();
  if (mazeAlgo === 'Open Grid') {
    grid.drawGuides(mazeCtx);
  }
  grid.draw(mazeCtx);

  const isPathFound = startNode.pathCoordinates.length > 0;
  if (isPathFound) {
    return;
  }

  requestAnimationFrame(visualizePathfindingAlgo);
}

function drawSolution() {
  const drawStartNodeAndFootprints = () => {
    startNode.draw(solutionCtx);
    startNode.drawFootprints(solutionCtx);
  };

  const { canvasSize } = store.getState();
  solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);

  if (startNode.atExit) {
    drawStartNodeAndFootprints();
    targetNode.resetScale();
    store.dispatch(actions.solutionFound());
    return;
  }

  targetNode.draw(solutionCtx, 'spriteWhite', true);
  targetNode.setScale();
  startNode.move();
  drawStartNodeAndFootprints();

  requestAnimationFrame(drawSolution);
}
