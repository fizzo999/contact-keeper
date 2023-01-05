import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext.js';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // pass contact which is component level state into the function addContact which we have access to through ContactContext
    contactContext.addContact(contact);
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'> Add Contact</h2>
      <input
        className='m-2'
        type='text'
        placeholder='enter a name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        className='m-2'
        type='text'
        placeholder='enter an email address'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        className='m-2'
        type='text'
        placeholder='enter a phone number'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5 className='m-2 text-center'>Contact Type</h5>
      <input
        className='m-2'
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{'  '}
      <input
        className='m-2'
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{'  '}
      <div>
        <input
          type='submit'
          value='Add Contact'
          className='btn btn-primary btn-block m-2'
        />
      </div>
    </form>
  );
};

export default ContactForm;
