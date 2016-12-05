import React from 'react';
import ReactDOM from 'react-dom';
import createStore from '../../es/createStore';
import applyMiddleware from '../../es/applyMiddleware';
import UserList from './components/UserList';
import reducer from './reducer';
import createSagaMiddleware from 'redux-saga';
import appSagas from './sagas';
import {
  fetchUsers,
} from './actions';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  {},
  applyMiddleware(...middleware),
);

store.runSaga = sagaMiddleware.run;
appSagas.map(sagaMiddleware.run);

store.dispatch(fetchUsers());

const render = () => ReactDOM.render(
  <UserList users={store.getState().users}/>,
  document.getElementById('root')
);

render();
store.subscribe(render);
