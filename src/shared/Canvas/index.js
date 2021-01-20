import { createElement } from '../../utils';
import styles from './style.module.css';

const Canvas = ({ canvasRef }) => (
  <canvas ref={canvasRef} className={styles.Canvas}></canvas>
);

export default Canvas;
