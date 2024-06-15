import axios from 'axios';

const BASE_URL = 'http://3.216.182.63:8095/TestApi';

export const addOperationalArea = async (operationalArea) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddOperationalArea`, operationalArea);
    return response.data;
  } catch (error) {
    console.error('Error adding operational area:', error);
    throw error;
  }
};

export const getOperationalAreas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetOperationAreas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching operational areas:', error);
    throw error;
  }
};
