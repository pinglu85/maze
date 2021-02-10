import { createElement, render, useRef } from '../utils';
import {
  algoSelected,
  taskChanged,
  gridSizeUpdated,
} from '../constants/actionTypes';
import { CREATE_MAZE } from '../constants/taskNames';
import BlankSlate from './BlankSlate';
import MazeAlgoDescription from './MazeAlgoDescription';
import PathfindingAlgoDescription from './PathfindingAlgoDescription';
import algoDescriptions from './algoDescriptions';
import styles from './style.module.css';

const Description = ({ store, mazeCanvasRef, solutionCanvasRef }) => {
  const rootRef = useRef();

  const renderBlankSlateOnTaskChange = (_, state) => {
    if (!rootRef.current) {
      return;
    }

    const root = resetRootInnerHtml();
    const node = render(<BlankSlate task={state.task} />);
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

    const root = resetRootInnerHtml();
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

  const resetRootInnerHtml = () => {
    const root = rootRef.current;
    root.innerHTML = '';
    return root;
  };

  return (
    <div ref={rootRef} className={styles.Description}>
      <BlankSlate task={CREATE_MAZE} />
    </div>
  );
};

export default Description;
