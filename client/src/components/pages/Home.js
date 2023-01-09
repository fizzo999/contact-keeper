import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts.js';
import ContactForm from '../contacts/ContactForm.js';
import ContactFilter from '../contacts/ContactFilter.js';
import AuthContext from '../../context/auth/authContext.js';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    console.log(
      'we are in HOME component and we are checking for local storage'
    );
    // if (localStorage.token && !authContext.isAuthenticated)
    //   authContext.loadUser();
    // console.log(
    //   'we are in HOME component and we are checking for isAuthenticated'
    // );
    // authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
