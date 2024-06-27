import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './auth/login.jsx';
import Register from './auth/register.jsx';
import Feed from './components/feed.jsx';
import ProtectedRoute from './components/protectedroute.jsx';
import { AuthProvider } from "./components/authcontext.js";
import Protected from './components/protected.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protected />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
