import { getRandomIndex, swapItemsInArray } from '.';

// Fisher-Yates shuffle
function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomIndex(i + 1);
    swapItemsInArray(arr, i, j);
  }
  return arr;
}

function shuffleArrIndices(arrLen) {
  const createArr = (len) => Array.from(new Array(len), (_, i) => i);

  const iterable = {
    index: 0,
    indices: shuffleArr(createArr(arrLen)),
    next() {
      return {
        value: this.indices[this.index++],
        done: this.index > this.indices.length,
      };
    },
  };

  return {
    [Symbol.iterator]() {
      return iterable;
    },
  };
}

export { shuffleArr, shuffleArrIndices };
