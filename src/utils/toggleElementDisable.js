function toggleElementDisable(prevState, state, nodeRef) {
  const isAppStateChanged =
    prevState.isMazeGenerating !== state.isMazeGenerating ||
    prevState.isSearchingForSolution !== state.isSearchingForSolution;

  if (!isAppStateChanged || !nodeRef.current) {
    return;
  }

  const node = nodeRef.current;
  if (node.nodeName === 'BUTTON') {
    node.disabled = !node.disabled;
    return;
  }

  node.classList.toggle('disabled');
}

export default toggleElementDisable;
