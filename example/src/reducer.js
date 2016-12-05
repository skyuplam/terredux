import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
} from './constants';

const initialState = {
  isFetching: false,
  error: false,
  users: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return Object.assign(state, {
        isFetching: true,
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign(state, {
        isFetching: false,
        users: action.users,
      });
    default:
      return state;
  }
}

export default reducer;
