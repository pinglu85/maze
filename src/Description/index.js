import { createElement, render, useRef } from '../utils';
import {
  algoSelected,
  taskChanged,
  gridSizeUpdated,
} from '../constants/actionTypes';
import BlankSlate from './BlankSlate';
import MazeAlgoDescription from './MazeAlgoDescription';
import PathfindingAlgoDescription from './PathfindingAlgoDescription';
import algoDescriptions from './algoDescriptions';
import styles from './style.module.css';

const Description = ({ store, mazeCanvasRef, solutionCanvasRef }) => {
  const rootRef = useRef();

  const renderBlankSlateOnTaskChange = (prevState, state) => {
    const isTaskNotChanged =
      prevState.isTaskCreateMaze && state.isTaskCreateMaze;
    if (!rootRef.current || isTaskNotChanged) {
      return;
    }

    const root = clearRootInnerHtml();
    const node = render(
      <BlankSlate isTaskCreateMaze={state.isTaskCreateMaze} />
    );
    root.appendChild(node);
  };
  store.subscribe({
    actionTypes: [taskChanged, gridSizeUpdated],
    subscriber: renderBlankSlateOnTaskChange,
  });

  const renderDescriptionOnAlgoSelect = (_, state) => {
    if (!rootRef.current) {
      return;
    }

    const root = clearRootInnerHtml();
    const mazeCtx = mazeCanvasRef.current.ctx;
    const solutionCtx = solutionCanvasRef.current.ctx;
    const { isMazeAlgo, name: algoName } = state.algo;
    const description = algoDescriptions.get(algoName);
    let node;

    if (isMazeAlgo) {
      node = render(
        <MazeAlgoDescription
          algoName={algoName}
          description={description}
          store={store}
          mazeCtx={mazeCtx}
          solutionCtx={solutionCtx}
          isNextStepBtnDisabled={!state.isMazeGenerated}
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

  const clearRootInnerHtml = () => {
    const root = rootRef.current;
    root.innerHTML = '';
    return root;
  };

  return (
    <div ref={rootRef} className={styles.Description}>
      <BlankSlate isTaskCreateMaze />
    </div>
  );
};

export default Description;
