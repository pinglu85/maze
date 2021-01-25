import { createElement, useRef } from '../utils';
import { GRID_SIZE_SET } from '../store/actionTypes';
import Canvas from '../shared/Canvas';
import grid from '../Grid';
import setCanvasesSize from './setCanvasesSize';
import styles from './style.module.css';

const Canvases = ({ subscribe, mazeCanvasRef, solutionCanvasRef }) => {
  const canvasesRef = useRef();

  const handleCanvasSizeChange = (_, state) => {
    const { gridSize } = state;

    if (!canvasesRef.current) {
      return;
    }

    const canvasWrapper = canvasesRef.current;
    const { node: mazeCanvas, ctx: mazeCtx } = mazeCanvasRef.current;
    const solutionCanvas = solutionCanvasRef.current.node;
    const canvases = [mazeCanvas, solutionCanvas];

    setCanvasesSize(canvasWrapper, canvases, state.canvasSize);
    grid.setContent(gridSize);
    grid.draw(mazeCtx);
  };
  subscribe({
    actionTypes: [GRID_SIZE_SET],
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
