import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
} from './constants';

export function fetchUsers() {
  return {
    type: FETCH_USERS,
  };
};

export function usersFetched(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users,
  };
}

export function usersFetchingError(error) {
  return {
    type: FETCH_USERS_ERROR,
    error,
  };
}
