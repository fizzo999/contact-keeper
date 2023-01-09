import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext.js';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, clearCurrent, current } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
    // }, [contactContext, current]); - not necessary - monitoring current for changes for this useEffect hook should be enough !
  }, [current]);

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // pass contact which is component level state into the function addContact which we have access to through ContactContext
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {' '}
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        className='m-2'
        type='text'
        placeholder='enter a name'
        name='name'
        value={name}
        onChange={onChange}
        required
      />
      <input
        className='m-2'
        type='text'
        placeholder='enter an email address'
        name='email'
        value={email}
        onChange={onChange}
        required
      />
      <input
        className='m-2'
        type='text'
        placeholder='enter a phone number'
        name='phone'
        value={phone}
        onChange={onChange}
        required
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
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block m-2'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            clear this form
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
