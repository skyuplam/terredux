import compose from './compose';
import {
  assign,
} from 'lodash';

function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState) => {
    const store = createStore(reducer, preloadedState);
    let dispatch = store.dispatch;

    const chain = middlewares.map((middleware) =>
      middleware({
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      })
    );

    dispatch = compose(chain)(store.dispatch);

    return assign({}, store, dispatch);
  };
}

export default applyMiddleware;
