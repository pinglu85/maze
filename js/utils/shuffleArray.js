export default function shuffleArray(arrLen) {
  const createArr = (len) => Array.from(new Array(len), (_, i) => i);
  // Fisher-Yates shuffle
  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const iterable = {
    index: 0,
    indices: shuffle(createArr(arrLen)),
    next() {
      return {
        value: this.indices[this.index++],
        done: this.index > this.indices.length
      };
    }
  };

  return {
    [Symbol.iterator]() {
      return iterable;
    }
  };
}
