import { gridSizeUpdated } from '../constants/actionTypes';

export const doUpdateGridSize = (payload) => ({
  type: gridSizeUpdated,
  payload: payload,
});
