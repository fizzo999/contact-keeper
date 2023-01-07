import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const alertReducerFunction = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
      console.log(
        'we are inside of the reducer and putting it into local storage',
        action.payload.token
      );
      localStorage.setItem('token', action.payload.token);
      console.log('and now it should be in local storage !!!');
      console.log(
        'here is proof here is local storage =====>>>>>>>>',
        localStorage.getItem('token')
      );

      return {
        ...state,
        ...action.payload,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default alertReducerFunction;
