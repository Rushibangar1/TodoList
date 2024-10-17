// src/services/UserService.js
import axios from 'axios';

const API_URL = 'http://your-api-url.com/api/users'; // Update with your API endpoint

export const addUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data; // Return the added user data
};
