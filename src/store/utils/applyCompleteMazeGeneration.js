function applyCompleteMazeGeneration(state) {
  return {
    ...state,
    isMazeGenerating: false,
    isMazeGenerated: true,
  };
}

export default applyCompleteMazeGeneration;
