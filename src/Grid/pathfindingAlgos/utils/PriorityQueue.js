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

    const heapSize = this.size();
    if (heapSize === 1) {
      return;
    }

    this.#heapifyUp(heapSize - 1);
  }

  pull() {
    const heapSize = this.size();
    if (heapSize <= 1) {
      return this.#elements.pop();
    }

    swapItemsInArray(this.#elements, 0, heapSize - 1);
    const head = this.#elements.pop();
    this.#heapifyDown(0);
    return head;
  }

  peek() {
    return this.#elements[0];
  }

  size() {
    return this.#elements.length;
  }

  #heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex < 0) {
      return;
    }

    const comparison = this.#compare(
      this.#elements[index],
      this.#elements[parentIndex]
    );
    if (comparison < 0) {
      swapItemsInArray(this.#elements, parentIndex, index);
      this.#heapifyUp(parentIndex);
    }
  }

  #heapifyDown(index) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    let swappableIndex = index;
    const heapSize = this.size();

    if (leftChildIndex < heapSize) {
      const comparisonWithLeftChild = this.#compare(
        this.#elements[swappableIndex],
        this.#elements[leftChildIndex]
      );

      if (comparisonWithLeftChild > 0) {
        swappableIndex = leftChildIndex;
      }
    }

    if (rightChildIndex < heapSize) {
      const comparisonWithRightChild = this.#compare(
        this.#elements[swappableIndex],
        this.#elements[rightChildIndex]
      );

      if (comparisonWithRightChild > 0) {
        swappableIndex = rightChildIndex;
      }
    }

    if (swappableIndex !== index) {
      swapItemsInArray(this.#elements, swappableIndex, index);
      this.#heapifyDown(swappableIndex);
    }
  }
}

export default PriorityQueue;
