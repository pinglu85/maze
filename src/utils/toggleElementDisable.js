import * as actionTypes from '../store/actionTypes';

function toggleElementDisable(nodeRef) {
  const subscriber = () => {
    if (!nodeRef.current) {
      return;
    }

    const node = nodeRef.current;
    if (node.nodeName === 'BUTTON') {
      node.disabled = !node.disabled;
      return;
    }

    node.classList.toggle('disabled');
  };

  return {
    actionTypes: [
      actionTypes.MAZE_GENERATION_INIT,
      actionTypes.MAZE_GENERATION_SUCCESS,
      actionTypes.SOLUTION_SEARCH_INIT,
      actionTypes.SOLUTION_SEARCH_SUCCESS,
    ],
    subscriber,
  };
}

export default toggleElementDisable;
