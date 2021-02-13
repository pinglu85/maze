import { createElement, useRef } from '../utils';
import { gridSizeUpdated } from '../constants/actionTypes';
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

  return (
    <div ref={canvasesRef} className={styles.Canvases}>
      <Canvas canvasRef={mazeCanvasRef} />
      <Canvas canvasRef={solutionCanvasRef} />
    </div>
  );
};

export default Canvases;
