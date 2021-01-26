function applyCompleteSolvingProcess(state) {
  return {
    ...state,
    isSearchingForSolution: false,
    isSolutionFound: true,
  };
}

export default applyCompleteSolvingProcess;
