import { createElement, render, useRef } from '../utils';
import store from '../store';
import MazeAlgoDescription from './MazeAlgoDescription';
import PathfindingAlgoDescription from './PathfindingAlgoDescription';
import algoDescriptions from './algoDescriptions';
import styles from './style.module.css';

const Description = ({ mazeCanvasRef, solutionCanvasRef }) => {
  const rootRef = useRef();

  const renderContentOnAlgoSelect = (prevState, state) => {
    const isAlgoTypeChanged = prevState.algoType !== state.algoType;
    const isMazeAlgoChanged = prevState.mazeAlgo !== state.mazeAlgo;
    const isPathfindingAlgoChanged =
      prevState.pathfindingAlgo !== state.pathfindingAlgo;

    if (!isAlgoTypeChanged && !isMazeAlgoChanged && !isPathfindingAlgoChanged) {
      return;
    }
    if (!rootRef.current) {
      return;
    }

    const root = rootRef.current;
    root.innerHTML = '';
    const mazeCtx = mazeCanvasRef.current.ctx;
    const solutionCtx = solutionCanvasRef.current.ctx;
    const currentAlgoType = state.algoType;
    const currentAlgo = state[currentAlgoType];
    const description = algoDescriptions[currentAlgo];
    let node;

    if (currentAlgoType === 'mazeAlgo') {
      node = render(
        <MazeAlgoDescription
          algo={currentAlgo}
          description={description}
          getState={store.getState}
          dispatch={store.dispatch}
          subscribe={store.subscribe}
          mazeCtx={mazeCtx}
          solutionCtx={solutionCtx}
        />
      );
    } else {
      node = render(
        <PathfindingAlgoDescription
          description={description}
          getState={store.getState}
          dispatch={store.dispatch}
          subscribe={store.subscribe}
          mazeCtx={mazeCtx}
          solutionCtx={solutionCtx}
        />
      );
    }

    root.appendChild(node);
  };
  store.subscribe(renderContentOnAlgoSelect);

  return (
    <div ref={rootRef} className={styles.Description}>
      <div className={styles.encouragement}>
        Pick a maze algorithm and visualize it!
      </div>
    </div>
  );
};

export default Description;
