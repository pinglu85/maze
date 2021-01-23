function applySolutionSearchInit(state) {
  return {
    ...state,
    isSearchingForSolution: true,
    isSolutionFound: false,
  };
}

export default applySolutionSearchInit;
