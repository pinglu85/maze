import * as actionTypes from '../constants/actionTypes';

function toggleElementDisable(...nodeRefs) {
  const subscriber = () => {
    for (const nodeRef of nodeRefs) {
      if (!nodeRef.current) {
        continue;
      }

      const node = nodeRef.current;
      if (node.nodeName === 'BUTTON') {
        node.disabled = !node.disabled;
        continue;
      }

      node.classList.toggle('disabled');
    }
  };

  return {
    actionTypes: [
      actionTypes.mazeGenerationInitiated,
      actionTypes.mazeGenerationCompleted,
      actionTypes.solvingProcessInitiated,
      actionTypes.solvingProcessCompleted,
    ],
    subscriber,
  };
}

export default toggleElementDisable;
