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
    this.#subscribers = new Map();
  }

  createStore = (reducer, initialState) => {
    this.#state = { ...initialState };
    this.#reduce = reducer;
    return this;
  };

  getState = () => {
    return this.#state;
  };

  dispatch = (action) => {
    this.#prevState = deepCloneObj(this.#state);
    this.#state = this.#reduce(this.#state, action);
    this.#notifySubscribers(action.type);
  };

  subscribe = ({ actionTypes, subscriber }) => {
    const subscribers = this.#subscribers;

    for (const actionType of actionTypes) {
      if (!subscribers.has(actionType)) {
        subscribers.set(actionType, [subscriber]);
        continue;
      }

      const actionSubscribers = subscribers.get(actionType).concat(subscriber);
      subscribers.set(actionType, actionSubscribers);
    }
  };

  #notifySubscribers(actionType) {
    const subscribers = this.#subscribers;
    if (!subscribers.has(actionType)) {
      return;
    }

    const actionSubscribers = subscribers.get(actionType);
    for (const subscriber of actionSubscribers) {
      subscriber(this.#prevState, this.#state);
    }
  }
}

const store = new Store();

export default store.createStore;
