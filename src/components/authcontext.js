// authcontext.js
import React, { createContext, useState, useEffect,useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import authService from '../services/authservice';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      try { 
         const decoded = jwtDecode(JSON.parse(accessToken));
        setAuthState({
          isAuthenticated: true,
          user: decoded,
        });
      } catch (error) {
    
        setAuthState({
          isAuthenticated: false,
          user: null,
        });
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
      const { accessToken } = response;
      localStorage.setItem('token', JSON.stringify(accessToken));
      const decoded = jwtDecode(accessToken);
      setAuthState({
        isAuthenticated: true,
        user: decoded,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid username or password');
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('maxAge');
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };