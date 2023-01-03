import React from 'react';
import Contacts from '../contacts/Contacts.js';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>{/* Contact Form will go here */}</div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
