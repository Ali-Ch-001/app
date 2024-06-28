import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  });

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setAuthState({ isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setAuthState({ isAuthenticated: false });
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (authState.isAuthenticated !== isAuthenticated) {
      setAuthState({ isAuthenticated });
    }
  }, [authState.isAuthenticated]);

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { authState, login, logout } = useContext(AuthContext);

  const isAuthenticated = () => {
    return authState.isAuthenticated;
  };

  return { authState, login, logout, isAuthenticated };
};
