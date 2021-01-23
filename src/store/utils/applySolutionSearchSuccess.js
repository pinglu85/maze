function applySolutionSearchSuccess(state) {
  return {
    ...state,
    isSearchingForSolution: false,
    isSolutionFound: true,
  };
}

export default applySolutionSearchSuccess;
