import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext.js';
import authReducer from './authReducer.js';
import setAuthToken from '../../utils/setAuthToken.js';

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
  const loadUser = async () => {
    console.log(
      'we are inside of loadUser and here is localStorage.token',
      localStorage.token,
      localStorage.getItem('token'),
      'and we are starting the timeout...'
    );
    setTimeout(async () => {
      console.log('timeout done...');
      if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
        try {
          // const res = await axios.get('http://localhost:5000/api/auth/users');
          // checking in server.js and then in /routes/auth.js shows the get request first fires off middleware that checks for token (which by now has been set globally into the headers through our utils function - and then needs user.id in the req.user to work ....???
          const res = await axios.get('/api/auth');

          console.log('we are inside AuthState and here is res.data', res.data);

          dispatch({
            type: USER_LOADED,
            payload: res.data,
          });
        } catch (err) {
          // dispatch({
          //   type: AUTH_ERROR,
          // });
        }
      } else {
        console.log('there is no TOKEN !!!!!');
      }
    }, 1000);
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // } else {
    //   console.log('there is no TOKEN !!!!!');
    // }

    // try {
    //   const res = await axios.get('/api/auth/user');

    //   console.log('we are inside AuthState and here is res.data', res.data);

    //   dispatch({
    //     type: USER_LOADED,
    //     payload: res.data,
    //   });
    // } catch (err) {
    //   dispatch({
    //     type: AUTH_ERROR,
    //   });
    // }
  };

  //register user
  const registerUser = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

    console.log(
      'we are now inside of auth state and here is formData',
      formData
    );
    try {
      const res = await axios.post('/api/users', formData, config);

      console.log('here is res.data', res.data);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
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
    dispatch({
      type: CLEAR_ERRORS,
    });
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
