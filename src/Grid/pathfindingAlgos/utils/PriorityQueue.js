import { swapItemsInArray } from '../../../utils';

class PriorityQueue {
  #heap;

  constructor(compare) {
    this.compare = compare;
    this.#heap = [];
  }

  add(element) {
    this.#heap.push(element);

    const heapSize = this.size();
    if (heapSize === 1) {
      return;
    }

    this.#heapifyUp(heapSize - 1);
  }

  poll() {
    const heapSize = this.size();
    if (heapSize <= 1) {
      return this.#heap.pop();
    }

    swapItemsInArray(this.#heap, 0, heapSize - 1);
    const head = this.#heap.pop();
    this.#heapifyDown(0);
    return head;
  }

  peek() {
    return this.#heap[0];
  }

  size() {
    return this.#heap.length;
  }

  #heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex < 0) {
      return;
    }

    const comparison = this.compare(this.#heap[index], this.#heap[parentIndex]);
    if (comparison < 0) {
      swapItemsInArray(this.#heap, parentIndex, index);
      this.#heapifyUp(parentIndex);
    }
  }

  #heapifyDown(index) {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = index * 2 + 2;
    let swappableIndex = index;
    const heapSize = this.size();

    if (leftChildIndex < heapSize) {
      const comparisonWithLeftChild = this.compare(
        this.#heap[swappableIndex],
        this.#heap[leftChildIndex]
      );

      if (comparisonWithLeftChild > 0) {
        swappableIndex = leftChildIndex;
      }
    }

    if (rightChildIndex < heapSize) {
      const comparisonWithRightChild = this.compare(
        this.#heap[swappableIndex],
        this.#heap[rightChildIndex]
      );

      if (comparisonWithRightChild > 0) {
        swappableIndex = rightChildIndex;
      }
    }

    if (swappableIndex !== index) {
      swapItemsInArray(this.#heap, swappableIndex, index);
      this.#heapifyDown(swappableIndex);
    }
  }
}

export default PriorityQueue;
