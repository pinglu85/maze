import { createElement, useRef } from './utils';
import Navbar from './Navbar';
import Description from './Description';
import Canvases from './Canvases';
import styles from './App.module.css';

const App = ({ store }) => {
  const mazeCanvasRef = useRef({
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
        <Canvases
          mazeCanvasRef={mazeCanvasRef}
          solutionCanvasRef={solutionCanvasRef}
          subscribe={store.subscribe}
        />
      </main>
    </>
  );
};

export default App;
