import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.js';
import Home from './components/pages/Home.js';
import About from './components/pages/About.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Alerts from './components/layout/Alerts.js';

import ContactState from './context/contact/ContactState.js';
import AuthState from './context/auth/AuthState.js';
import AlertState from './context/alert/AlertState.js';
import setAuthToken from './utils/setAuthToken.js';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/about' element={<About />} />
                  <Route exact path='/register' element={<Register />} />
                  <Route exact path='/login' element={<Login />} />
                </Routes>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
