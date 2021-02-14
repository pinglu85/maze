import { createElement, useRef } from '../utils';
import { gridSizeUpdated, taskChanged } from '../constants/actionTypes';
import Canvas from './Canvas';
import grid from '../Grid';
import setCanvasesSize from './setCanvasesSize';
import styles from './style.module.css';

const Canvases = ({ subscribe, mazeCanvasRef, solutionCanvasRef }) => {
  const canvasesRef = useRef();

  const handleCanvasSizeChange = (_, state) => {
    if (!canvasesRef.current) {
      return;
    }

    const { gridSize } = state;
    const canvasWrapper = canvasesRef.current;
    const { node: mazeCanvas, ctx: mazeCtx } = mazeCanvasRef.current;
    const solutionCanvas = solutionCanvasRef.current.node;
    const canvases = [mazeCanvas, solutionCanvas];

    // Changing the canvas size erases the previous drawing.
    setCanvasesSize(canvasWrapper, canvases, state.canvasSize);
    grid.setContent(gridSize);
    grid.draw(mazeCtx);
  };
  subscribe({
    actionTypes: [gridSizeUpdated],
    subscriber: handleCanvasSizeChange,
  });

  const resetDrawingOnTaskChange = (_, state) => {
    if (!canvasesRef.current || !state.isTaskCreateMaze) {
      return;
    }

    const { gridSize, canvasSize } = state;
    const { ctx: mazeCtx } = mazeCanvasRef.current;
    const { ctx: solutionCtx } = solutionCanvasRef.current;

    solutionCtx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    grid.setContent(gridSize);
    grid.draw(mazeCtx);
  };
  subscribe({
    actionTypes: [taskChanged],
    subscriber: resetDrawingOnTaskChange,
  });

  return (
    <div ref={canvasesRef} className={styles.Canvases}>
      <Canvas canvasRef={mazeCanvasRef} />
      <Canvas canvasRef={solutionCanvasRef} />
    </div>
  );
};

export default Canvases;
