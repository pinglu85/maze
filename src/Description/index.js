import { createElement, render, useRef } from '../utils';
import { algoSelected } from '../store/actionTypes';
import MazeAlgoDescription from './MazeAlgoDescription';
import PathfindingAlgoDescription from './PathfindingAlgoDescription';
import algoDescriptions from './algoDescriptions';
import styles from './style.module.css';

const Description = ({ store, mazeCanvasRef, solutionCanvasRef }) => {
  const rootRef = useRef();

  const renderDescriptionOnAlgoSelect = (_, state) => {
    if (!rootRef.current) {
      return;
    }

    const root = rootRef.current;
    root.innerHTML = '';
    const mazeCtx = mazeCanvasRef.current.ctx;
    const solutionCtx = solutionCanvasRef.current.ctx;
    const algoType = state.algo.type;
    const algoName = state.algo.name;
    const description = algoDescriptions.get(algoName);
    let node;

    if (algoType === 'mazeAlgo') {
      node = render(
        <MazeAlgoDescription
          algoName={algoName}
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
  store.subscribe({
    actionTypes: [algoSelected],
    subscriber: renderDescriptionOnAlgoSelect,
  });

  return (
    <div ref={rootRef} className={styles.Description}>
      <div className={styles.encouragement}>
        Pick a maze algorithm and visualize it!
      </div>
    </div>
  );
};

export default Description;
