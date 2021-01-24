import { createElement, render, useRef } from '../utils';
import MazeAlgoDescription from './MazeAlgoDescription';
import PathfindingAlgoDescription from './PathfindingAlgoDescription';
import algoDescriptions from './algoDescriptions';
import styles from './style.module.css';

const Description = ({ store, mazeCanvasRef, solutionCanvasRef }) => {
  const rootRef = useRef();

  const renderDescriptionOnAlgoSelect = (prevState, state) => {
    const isAlgoNameChanged = prevState.algo.name !== state.algo.name;
    if (!isAlgoNameChanged) {
      return;
    }
    if (!rootRef.current) {
      return;
    }

    const root = rootRef.current;
    root.innerHTML = '';
    const mazeCtx = mazeCanvasRef.current.ctx;
    const solutionCtx = solutionCanvasRef.current.ctx;
    const algoType = state.algo.type;
    const algoName = state.algo.name;
    const description = algoDescriptions[algoName];
    let node;

    if (algoType === 'mazeAlgo') {
      node = render(
        <MazeAlgoDescription
          algo={algoName}
          description={description}
          store={store}
          mazeCtx={mazeCtx}
          solutionCtx={solutionCtx}
        />
      );
    } else {
      node = render(
        <PathfindingAlgoDescription
          description={description}
          store={store}
          mazeCtx={mazeCtx}
          solutionCtx={solutionCtx}
        />
      );
    }

    root.appendChild(node);
  };
  store.subscribe(renderDescriptionOnAlgoSelect);

  return (
    <div ref={rootRef} className={styles.Description}>
      <div className={styles.encouragement}>
        Pick a maze algorithm and visualize it!
      </div>
    </div>
  );
};

export default Description;
