import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contactprop }) => {
  const { id, name, phone, email, type } = contactprop;
  return (
    <div
      className='card bg-light'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <h3 className='text-primary' style={{}}>
        {name}
        {'  '}
      </h3>
      <h3
        className={
          'p-2' +
          ' ' +
          'badge' +
          ' ' +
          (type === 'professional' ? 'badge-success' : 'badge-primary')
        }
        style={{ height: '3em', lineHeight: '1.5em' }}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm'>Edit</button>
        <button className='btn btn-danger btn-sm'>Delete</button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
