import {
  mazeGenerationInitiated,
  mazeGenerationCompleted,
} from '../../constants/actionTypes';

export const doInitiateMazeGeneration = () => ({
  type: mazeGenerationInitiated,
});

export const doCompleteMazeGeneration = () => ({
  type: mazeGenerationCompleted,
});
