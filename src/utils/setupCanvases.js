const canvasWrapper = document.getElementById('canvas-wrapper');
const mazeCanvas = document.getElementById('maze-canvas');
const solutionCanvas = document.getElementById('solution-canvas');
const canvases = [mazeCanvas, solutionCanvas];

function setupCanvases() {
  const ctxes = canvases.map((canvas) => canvas.getContext('2d'));

  const setCanvasesSize = ({ width, height }) => {
    canvases.forEach((canvas) => {
      canvas.width = width;
      canvas.height = height;
    });
    canvasWrapper.style.width = `${width}px`;
    canvasWrapper.style.height = `${height}px`;
  };

  return [ctxes, setCanvasesSize];
}

export default setupCanvases;
