import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL; 

export const getMeterSizes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetMeterSizes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meter sizes:', error);
    throw error;
  }
};
