import { createElement, useRef } from '../utils';
import { gridSizeUpdated, taskChanged } from '../constants/actionTypes';
import { CELL_SIZE, LINE_WIDTHS } from '../constants/size';
import Canvas from './Canvas';
import grid from '../Grid';
import setCanvasesSize from './setCanvasesSize';
import weightNodes from '../WeightNodes';
import drawWeightNodes from './drawWeightNodes';
import styles from './style.module.css';

const Canvases = ({
  store,
  mazeCanvasRef,
  weightNodesCanvasRef,
  solutionCanvasRef,
}) => {
  const canvasesRef = useRef();

  const handleCanvasSizeChange = (_, state) => {
    if (!canvasesRef.current) {
      return;
    }

    const { gridSize } = state;
    const canvasWrapper = canvasesRef.current;
    const { node: mazeCanvas, ctx: mazeCtx } = mazeCanvasRef.current;
    const weightNodesCanvas = weightNodesCanvasRef.current.node;
    const solutionCanvas = solutionCanvasRef.current.node;
    const canvases = [mazeCanvas, weightNodesCanvas, solutionCanvas];

    // Changing the canvas size erases the previous drawing.
    setCanvasesSize(canvasWrapper, canvases, state.canvasSize);
    weightNodes.clear();
    grid.setContent(gridSize);
    grid.draw(mazeCtx);
  };
  store.subscribe({
    actionTypes: [gridSizeUpdated],
    subscriber: handleCanvasSizeChange,
  });

  const resetDrawingOnTaskChange = (_, state) => {
    if (!canvasesRef.current || !state.isTaskCreateMaze) {
      return;
    }

    const {
      gridSize,
      canvasSize: { width, height },
    } = state;
    const { ctx: mazeCtx } = mazeCanvasRef.current;
    const { ctx: weightNodesCtx } = weightNodesCanvasRef.current;
    const { ctx: solutionCtx } = solutionCanvasRef.current;

    weightNodesCtx.clearRect(0, 0, width, height);
    solutionCtx.clearRect(0, 0, width, height);
    weightNodes.clear();
    grid.setContent(gridSize);
    grid.draw(mazeCtx);
  };
  store.subscribe({
    actionTypes: [taskChanged],
    subscriber: resetDrawingOnTaskChange,
  });

  function handleCanvasesClick(e) {
    const {
      isSearchingForSolution,
      isTaskCreateMaze,
      canvasSize,
    } = store.getState();

    if (
      !weightNodesCanvasRef.current ||
      isSearchingForSolution ||
      isTaskCreateMaze
    ) {
      return;
    }

    const { ctx: mazeCtx } = mazeCanvasRef.current;
    const { ctx: weightNodesCtx } = weightNodesCanvasRef.current;
    const { ctx: solutionCtx } = solutionCanvasRef.current;
    const rect = this.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - LINE_WIDTHS.outerWall;
    const mouseY = e.clientY - rect.top - LINE_WIDTHS.outerWall;
    const rowIndex = Math.floor(mouseY / CELL_SIZE);
    const colIndex = Math.floor(mouseX / CELL_SIZE);
    const cell = grid.toggleWeightedCell(rowIndex, colIndex);
    if (cell) {
      drawWeightNodes(cell, canvasSize, mazeCtx, weightNodesCtx, solutionCtx);
    }
  }

  return (
    <div
      ref={canvasesRef}
      className={styles.Canvases}
      onClick={handleCanvasesClick}
    >
      <Canvas canvasRef={mazeCanvasRef} />
      <Canvas canvasRef={weightNodesCanvasRef} />
      <Canvas canvasRef={solutionCanvasRef} />
    </div>
  );
};

export default Canvases;
