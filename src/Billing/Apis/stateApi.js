import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const addState = async (state) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddState`, state);
    return response.data;
  } catch (error) {
    console.error('Error adding state:', error);
    throw error;
  }
};

export const getStates = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetStates`);
    return response.data;
  } catch (error) {
    console.error('Error fetching states:', error);
    throw error;
  }
};
