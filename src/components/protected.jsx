import React from 'react';


const Protected = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the accessToken from localStorage
    window.location.href = '/login'; // Redirect to the login page
  };

  const accessToken = localStorage.getItem('token');
  if (!accessToken) {
    // If no accessToken exists, render a message or redirect to login page
    window.location.href = '/login';
  }else{

  return (
    <div>
      <h1>Protected Page</h1>
      <p>Welcome, !</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};}

export default Protected;
