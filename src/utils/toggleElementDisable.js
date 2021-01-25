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
      actionTypes.mazeGenerationInit,
      actionTypes.mazeGenerationSuccess,
      actionTypes.solutionSearchInit,
      actionTypes.solutionSearchSuccess,
    ],
    subscriber,
  };
}

export default toggleElementDisable;
