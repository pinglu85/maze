function toggleElementDisable(prevState, state, nodeRef) {
  const isAppStateChanged =
    prevState.isMazeGenerating !== state.isMazeGenerating ||
    prevState.isSearchingSolution !== state.isSearchingSolution;

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
