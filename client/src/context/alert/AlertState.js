import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import AlertContext from './alertContext.js';

import alertReducer from './alertReducer.js';

import { SET_ALERT, REMOVE_ALERT } from '../types.js';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // setAlert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};
