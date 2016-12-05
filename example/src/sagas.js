import { takeLatest } from 'redux-saga';
import {
  call,
  put,
  fork,
} from 'redux-saga/effects';
import request from './request';
import {
  FETCH_USERS,
} from './constants';
import {
  usersFetched,
  usersFetchingError,
} from './actions';

export function* getUsers() {
  const requestURL = 'https://api.github.com/users';

  try {
    const users = yield call(request, requestURL);
    yield put(usersFetched(users));
  } catch (err) {
    yield put(usersFetchingError(err));
  }
}

export function* getUsersWatcher() {
  yield fork(takeLatest, FETCH_USERS, getUsers);
}

export function* githubData() {
  // Fork watcher so we can continue execution
  yield fork(getUsersWatcher);
}

export default [
  githubData,
]
