import { swapItemsInArray } from '../../../utils';

class PriorityQueue {
  #elements;
  #compare;

  constructor(compare) {
    this.#elements = [];
    this.#compare = compare;
  }

  insert(element) {
    this.#elements.push(element);
    this.#siftUp(this.#elements.length - 1);
  }

  pull() {
    swapItemsInArray(this.#elements, 0, this.#elements.length - 1);
    const removedElement = this.#elements.pop();
    this.#siftDown(0);
    return removedElement;
  }

  peek() {
    return this.#elements[0];
  }

  size() {
    return this.#elements.length;
  }

  #siftUp(idx) {
    let parentIdx = PriorityQueue.parent(idx);

    while (
      parentIdx >= 0 &&
      this.#compare(this.#elements[idx], this.#elements[parentIdx])
    ) {
      swapItemsInArray(this.#elements, parentIdx, idx);
      idx = parentIdx;
      parentIdx = PriorityQueue.parent(idx);
    }
  }

  #siftDown(idx) {
    const leftChildIdx = PriorityQueue.left(idx);
    const rightChildIdx = PriorityQueue.right(idx);
    let higherPriorityElementIdx = idx;

    if (
      leftChildIdx < this.#elements.length &&
      this.#compare(
        this.#elements[leftChildIdx],
        this.#elements[higherPriorityElementIdx]
      )
    ) {
      higherPriorityElementIdx = leftChildIdx;
    }

    if (
      rightChildIdx < this.#elements.length &&
      this.#compare(
        this.#elements[rightChildIdx],
        this.#elements[higherPriorityElementIdx]
      )
    ) {
      higherPriorityElementIdx = rightChildIdx;
    }

    if (higherPriorityElementIdx !== idx) {
      swapItemsInArray(this.#elements, higherPriorityElementIdx, idx);
      this.#siftDown(higherPriorityElementIdx);
    }
  }

  static parent(idx) {
    return Math.floor((idx - 1) / 2);
  }

  static left(idx) {
    return idx * 2 + 1;
  }

  static right(idx) {
    return idx * 2 + 2;
  }
}

export default PriorityQueue;
