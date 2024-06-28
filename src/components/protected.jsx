
import React from 'react';


const Protected = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.setItem('isAuthenticated',false) // Remove the accessToken from localStorage
    window.location.href = '/login'; // Redirect to the login page
  };


  

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome,!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Protected;
