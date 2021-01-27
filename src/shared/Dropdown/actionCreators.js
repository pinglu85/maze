import { algoSelected } from '../../constants/actionTypes';

export const doSelectAlgo = (payload) => ({
  type: algoSelected,
  payload: payload,
});
