import React from 'react';

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
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h3>
    </div>
  );
};

export default ContactItem;
