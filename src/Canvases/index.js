import { createElement, useRef } from '../utils';
import store from '../store';
import Canvas from '../shared/Canvas';
import grid from '../Grid';
import setCanvasesSize from './setCanvasesSize';
import styles from './style.module.css';

const Canvases = ({ mazeCanvasRef, solutionCanvasRef }) => {
  const canvasesRef = useRef();

  const handleCanvasSizeChange = (prevState, state) => {
    const { gridSize: prevGridSize } = prevState;
    const { gridSize } = state;
    const isGridSizeUpdated =
      prevGridSize.numOfRows !== gridSize.numOfRows ||
      prevGridSize.numOfCols !== gridSize.numOfCols;

    if (!isGridSizeUpdated) {
      return;
    }

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
  store.subscribe(handleCanvasSizeChange);

  return (
    <div ref={canvasesRef} className={styles.Canvases}>
      <Canvas canvasRef={mazeCanvasRef} />
      <Canvas canvasRef={solutionCanvasRef} />
    </div>
  );
};

export default Canvases;
