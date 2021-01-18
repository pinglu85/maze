import { deepCloneObj } from '.';

class Store {
  #prevState;
  #state;
  #reduce;
  #subscribers;

  constructor() {
    this.#prevState = {};
    this.#state = {};
    this.#reduce = () => {};
    this.#subscribers = [];
  }

  createStore = (reducer, initialState) => {
    this.#state = { ...initialState };
    this.#reduce = reducer;
    return this;
  };

  getState() {
    return this.#state;
  }

  dispatch = (action) => {
    this.#prevState = deepCloneObj(this.#state);
    this.#state = this.#reduce(this.#state, action);
    this.#notifySubscribers();
  };

  subscribe(fn) {
    this.#subscribers.push(fn);
  }

  #notifySubscribers() {
    this.#subscribers.forEach((subscriber) => {
      subscriber(this.#prevState, this.#state);
    });
  }
}

const store = new Store();

export default store.createStore;
