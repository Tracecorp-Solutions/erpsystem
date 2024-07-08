import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL; // Assuming you have set REACT_APP_API_URL in your .env file

export const getBlocks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetBlocks`);
    return response.data; // Returns the data received from the API
  } catch (error) {
    console.error('Error fetching blocks:', error); // Logs an error if fetching fails
    throw error; // Throws the error to be handled by the caller
  }
};
