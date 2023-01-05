import React, { useReducer } from 'react';
import AuthContext from './authContext.js';
import authReducer from './authReducer.js';
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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user
  const loadUser = () => {
    // something
  };
  //register user
  const registerUser = () => {
    // something
  };
  //login user
  const loginUser = () => {
    // something
  };
  //logout user
  const logoutUser = () => {
    // something
  };
  //clear errors
  const clearErrors = () => {
    // something
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        loadUser,
        registerUser,
        loginUser,
        logoutUser,
        clearErrors,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
