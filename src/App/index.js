import { createElement, useRef } from '../utils';
import Navbar from '../Navbar';
import Description from '../Description';
import Canvases from '../Canvases';
import styles from './style.module.css';

const App = ({ store }) => {
  const mazeCanvasRef = useRef({
    node: null,
    ctx: null,
  });
  const weightNodesCanvasRef = useRef({
    node: null,
    ctx: null,
  });
  const solutionCanvasRef = useRef({
    node: null,
    ctx: null,
  });

  return (
    <>
      <header className={styles.header}>
        <Navbar store={store} />
      </header>
      <main className={styles.main}>
        <Description
          mazeCanvasRef={mazeCanvasRef}
          solutionCanvasRef={solutionCanvasRef}
          store={store}
        />
        <div className={styles.canvasesWrapper}>
          <Canvases
            mazeCanvasRef={mazeCanvasRef}
            weightNodesCanvasRef={weightNodesCanvasRef}
            solutionCanvasRef={solutionCanvasRef}
            store={store}
          />
        </div>
      </main>
    </>
  );
};

export default App;
