import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/login.jsx';
import Register from './auth/register.jsx';
//import Feed from './components/feed.jsx';
import ProtectedRoute from './components/protectedroute.js';
import { AuthProvider } from "./components/authcontext.js";
import Protected from './components/protected.jsx';
import SwitchRoute from './components/switchroute.js';
const isAuthenticated = localStorage.getItem('isAuthenticated') === 'True'
function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route 
            path="/feed" 
            element={
              <SwitchRoute
                isAuthenticated={isAuthenticated}
                elementIfAuthenticated={<Protected />}
                elementIfNotAuthenticated={<Login />}
              />
            } 
          />
          <Route path="/" element={<ProtectedRoute component={Protected} isAuthenticated={isAuthenticated}/>}  />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
