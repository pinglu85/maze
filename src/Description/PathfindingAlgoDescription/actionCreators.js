import {
  solvingProcessInitiated,
  solvingProcessCompleted,
} from '../../constants/actionTypes';

export const doInitiateSolvingProcess = () => ({
  type: solvingProcessInitiated,
});

export const doCompleteSolvingProcess = () => ({
  type: solvingProcessCompleted,
});
