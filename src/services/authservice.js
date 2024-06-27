import axios from 'axios';

const API_URL = "http://localhost:3001";

const signup = (username, password) => {
  return axios
    .post(API_URL + "/signup", { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", JSON.stringify(response.data.accessToken)); // Store as string
      }
      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + '/login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('token', JSON.stringify(response.data.accessToken)); // Store as string
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const getCurrentUser = () => {
  const accessToken = localStorage.getItem("token");
  if (accessToken) {
    return JSON.parse(accessToken); // Parse the accessToken if it exists
  }
  return null;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
