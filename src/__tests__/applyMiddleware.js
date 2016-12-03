import applyMiddleware from '../applyMiddleware';
import createStore from '../createStore';
import {
  keys,
} from 'lodash';

const ADD_TODO = 'test/applyMiddleware/ADD_TODO';
const addTodo = (todo) => {
  return {
    type: ADD_TODO,
    todo,
  };
};
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
};

describe('applyMiddleware', () => {
  it('should wrap dispatch method with middleware once', () => {
    const test = (spy) => (methods) => {
      spy(methods);
      return (next) => (action) => next(action);
    };

    const spy = jest.fn();
    const store = applyMiddleware(test(spy))(createStore)(reducer);
    const todo1 = { id: 1, text: 'hello' };
    const todo2 = { id: 2, text: 'world' };
    store.dispatch(addTodo(todo1));
    store.dispatch(addTodo(todo2));

    expect(spy.mock.calls.length).toBe(1);

    expect(keys(spy.mock.calls[0][0])).toEqual([
    'getState',
    'dispatch',
    ]);

    expect(store.getState()).toEqual([
      todo1,
      todo2,
    ]);
  });
});
