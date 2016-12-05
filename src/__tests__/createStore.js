import createStore from '../createStore';
import {
  keys,
  assign,
} from 'lodash';

const ADD_TODO = 'tests/createStore/ADD_TODO';

const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};

const UNKNOWN_ACTION = 'tests/createStore/UNKNOWN_ACTION';

const unknownAction = () => ({ type: UNKNOWN_ACTION });

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        action.todo,
      ];
    default:
      return state;
  }
}


describe('createStore', () => {
  it('should expose the public API', () => {
    const store = createStore(reducer);
    const methods = keys(store);

    expect(methods.length).toBe(3);
  });

  it('should throw if reducer is not a function', () => {
    expect(() => createStore()).toThrow();
    expect(() => createStore('test')).toThrow();
    expect(() => createStore({})).toThrow();
    expect(() => createStore(() => {})).not.toThrow();
  });

  it('should pass the initial state,', () => {
    const initialState = [{ id: 1, text: 'Hello' }];
    const store = createStore(reducer, initialState);

    expect(store.getState()).toEqual(initialState);
  });

  it('should apply the reducer to the previous state', () => {
    const store = createStore(reducer);

    expect(store.getState()).toEqual([]);

    const todo = { id: 1, text: 'hello' };
    const action = addTodo(todo);
    store.dispatch(action);
    expect(store.getState()).toEqual([todo]);

    const todo2 = { id: 2, text: 'world!' };
    const action2 = addTodo(todo2);
    store.dispatch(action2);
    expect(store.getState()).toEqual([todo, todo2]);
  });

  it('should support multiple subscriptions', () => {
    const store = createStore(reducer);
    const listernerA = jest.fn();
    const listernerB = jest.fn();

    let unsubscribeA = store.subscribe(listernerA);
    store.subscribe(listernerB);

    unsubscribeA();

    store.dispatch(unknownAction());
    expect(listernerA.mock.calls.length).toBe(0);
    expect(listernerB.mock.calls.length).toBe(1);
  });

  it('should remove relevant listener when unsubscribe is called', () => {
    const store = createStore(reducer);
    const listener = jest.fn();

    store.subscribe(listener);
    const unsubscribeSecond = store.subscribe(listener);

    unsubscribeSecond();

    store.dispatch(unknownAction());
    expect(listener.mock.calls.length).toBe(0);
  });

  it('should accept enhancer as the third argument', () => {
    const emptyArray = [];
    const spyEnhancer = simpleCreateStore => (...arg) => {
      expect(arg[0]).toBe(reducer);
      expect(arg[1]).toBe(emptyArray);
      expect(arg.length).toBe(2);
      const simpleStore = simpleCreateStore(...arg);

      return assign({}, simpleStore, {
        dispatch: jest.fn(simpleStore.dispatch),
      });
    }

    const store = createStore(reducer, emptyArray, spyEnhancer);
    const todo1 = { id: 1, text: 'hello'  };
    const action = addTodo(todo1);
    store.dispatch(action);

    expect(store.dispatch).toBeCalledWith(action);
    expect(store.getState()).toEqual([
      todo1,
    ]);
  });
});
