function applyMazeGenerationSuccess(state) {
  return {
    ...state,
    isMazeGenerating: false,
    isMazeGenerated: true,
  };
}

export default applyMazeGenerationSuccess;
