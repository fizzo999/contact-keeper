import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext.js';
import AuthContext from '../../context/auth/authContext.js';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { setAlert } = alertContext;
  const { loginUser, clearErrors, error, isAuthenticated } = authContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (
      error === 'Invalid email - user does NOT exist' ||
      error === 'Invalid password'
    ) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      console.log('here we are logging in the user: ', user);
      loginUser({
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Accont <span className='text-primary'> Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
