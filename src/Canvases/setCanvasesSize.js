function setCanvasesSize(canvasWrapper, canvases, canvasSize) {
  const { width, height } = canvasSize;

  canvases.forEach((canvas) => {
    canvas.width = width;
    canvas.height = height;
  });
  canvasWrapper.style.width = `${width}px`;
  canvasWrapper.style.height = `${height}px`;
}

export default setCanvasesSize;
