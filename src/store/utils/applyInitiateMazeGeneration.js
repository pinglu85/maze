function applyInitiateMazeGeneration(state) {
  return {
    ...state,
    isMazeGenerating: true,
    isMazeGenerated: false,
    isSearchingForSolution: false,
    isSolutionFound: false,
  };
}

export default applyInitiateMazeGeneration;
