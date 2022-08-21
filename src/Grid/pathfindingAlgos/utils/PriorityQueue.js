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

  #siftUp(index) {
    let parentIndex = PriorityQueue.parent(index);

    while (
      parentIndex >= 0 &&
      this.#compare(this.#elements[index], this.#elements[parentIndex])
    ) {
      swapItemsInArray(this.#elements, parentIndex, index);
      index = parentIndex;
      parentIndex = PriorityQueue.parent(index);
    }
  }

  #siftDown(index) {
    const leftChildIndex = PriorityQueue.left(index);
    const rightChildIndex = PriorityQueue.right(index);
    let higherPriorityElementIdx = index;

    if (
      leftChildIndex < this.#elements.length &&
      this.#compare(
        this.#elements[leftChildIndex],
        this.#elements[higherPriorityElementIdx]
      )
    ) {
      higherPriorityElementIdx = leftChildIndex;
    }

    if (
      rightChildIndex < this.#elements.length &&
      this.#compare(
        this.#elements[rightChildIndex],
        this.#elements[higherPriorityElementIdx]
      )
    ) {
      higherPriorityElementIdx = rightChildIndex;
    }

    if (higherPriorityElementIdx !== index) {
      swapItemsInArray(this.#elements, higherPriorityElementIdx, index);
      this.#siftDown(higherPriorityElementIdx);
    }
  }

  static parent(index) {
    return Math.floor((index - 1) / 2);
  }

  static left(index) {
    return index * 2 + 1;
  }

  static right(index) {
    return index * 2 + 2;
  }
}

export default PriorityQueue;
