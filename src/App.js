import { createElement, useRef } from './utils';
import Navbar from './Navbar';
import Description from './Description';
import Canvases from './Canvases';
import SettingsDrawer from './SettingsDrawer';
import PopupWarning from './PopupWarning';
import styles from './App.module.css';

const App = () => {
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
        <Navbar />
      </header>
      <main className={styles.main}>
        <Description
          mazeCanvasRef={mazeCanvasRef}
          solutionCanvasRef={solutionCanvasRef}
        />
        <Canvases
          mazeCanvasRef={mazeCanvasRef}
          solutionCanvasRef={solutionCanvasRef}
        />
      </main>
      <PopupWarning />
      <SettingsDrawer />
    </>
  );
};

export default App;
