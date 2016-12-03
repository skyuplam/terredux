import {
  each,
  filter,
} from 'lodash';

const createStore = (reducer, preloadedState) => {
  let state = preloadedState;  // keep the state
  let listeners = [];  // keep track of the listeners

  // get the current state
  const getState = () => state;

  // the only way to change the state
  const dispatch = (action) => {
    state = reducer(state, action);
    each(listeners, (listener) => listener());  // notify all listeners
  };

  // Subscribe the changes for listeners
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = filter(listeners, (l) => l !== listener);
    };
  };

  dispatch({});  // initial state population

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export default createStore;
