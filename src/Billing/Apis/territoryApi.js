import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const addTerritory = async (territory) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddTerritory`, territory);
    return response.data;
  } catch (error) {
    console.error('Error adding territory:', error);
    throw error;
  }
};

export const getTerritories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetTerritories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching territories:', error);
    throw error;
  }
};
