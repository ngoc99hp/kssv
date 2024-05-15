// src/createClerkUser.js
import axios from 'axios';

export const createClerkUser = async (userName, email, password) => {
  try {
    const response = await axios.post('/api/create-user', {
      userName,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

