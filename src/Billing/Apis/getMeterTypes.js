import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getMeterTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetMeterTypes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meter types:', error);
    throw error;
  }
};
