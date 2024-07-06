import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getMeterMakes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetMeterMakes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching meter makes:', error);
    throw error;
  }
};
