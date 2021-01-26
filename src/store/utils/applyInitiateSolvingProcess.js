function applyInitiateSolvingProcess(state) {
  return {
    ...state,
    isSearchingForSolution: true,
    isSolutionFound: false,
  };
}

export default applyInitiateSolvingProcess;
