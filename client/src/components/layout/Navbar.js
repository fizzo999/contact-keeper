import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext.js';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { user, isAuthenticated, logoutUser } = authContext;

  const onLogout = () => {
    logoutUser();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
      {/* <li>
        <Link style={{ textDecoration: 'none' }} to='/'>
          Home
        </Link>
      </li>
      <li>
        <Link style={{ textDecoration: 'none' }} to='/about'>
          About
        </Link>
      </li> */}
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link style={{ textDecoration: 'none' }} to='/login'>
          Login
        </Link>
      </li>
      <li>
        <Link style={{ textDecoration: 'none' }} to='/register'>
          Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary p'>
      <h1>
        <i className={`${icon} p-3`}></i> {title} {' hello: '}
        {user && user.name}
      </h1>
      <ul className='lead'>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;
