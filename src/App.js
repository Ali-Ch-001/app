// src/App.js

import LoginForm from './auth/login';
import Register from './auth/register';
import React from 'react';

import {BrowserRouter, Routes,Route} from 'react-router-dom'

const App = () => {
  
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;