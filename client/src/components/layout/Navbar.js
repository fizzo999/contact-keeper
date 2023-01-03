import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <div className='navbar bg-primary p'>
      <h1>
        <i className={`${icon} p-3`}></i> {title}
      </h1>
      <ul className='lead'>
        <li>
          <Link style={{ textDecoration: 'none' }} to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link style={{ textDecoration: 'none' }} to='/about'>
            About
          </Link>
        </li>
      </ul>
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
