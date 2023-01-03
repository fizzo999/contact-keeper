import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home.js';
import About from './components/pages/About.js';
import Navbar from './components/layout/Navbar.js';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </div>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
