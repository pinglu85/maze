import { deepCloneObj } from '.';

class Store {
  constructor() {
    this.prevState = {};
    this.state = {};
    this._reduce = () => {};
    this.subscribers = [];
  }

  createStore(reducer, initialState) {
    this.state = { ...initialState };
    this._reduce = reducer;
    return this;
  }

  getState() {
    return this.state;
  }

  dispatch = (action) => {
    this.prevState = deepCloneObj(this.state);
    this.state = this._reduce(this.state, action);
    this._notifySubscribers();
  };

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  _notifySubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.prevState, this.state);
    });
  }
}

const store = new Store();

export default store;
