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

// initiate saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// create redux store and apply saga middleware
const store = createStore(
  reducer,
  {},
  applyMiddleware(...middleware),
);

// run saga runtime
store.runSaga = sagaMiddleware.run;
appSagas.map(sagaMiddleware.run);

// fetch users from github
store.dispatch(fetchUsers());

// render the page
const render = () => ReactDOM.render(
  <UserList users={store.getState().users}/>,
  document.getElementById('root')
);

render();

// listen the change from redux store
store.subscribe(render);
