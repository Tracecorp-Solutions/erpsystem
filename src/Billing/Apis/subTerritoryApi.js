import axios from 'axios';

const BASE_URL = 'http://3.216.182.63:8095/TestApi';

export const addSubTerritory = async (subTerritory) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddSubTerritory`, subTerritory);
    return response.data;
  } catch (error) {
    console.error('Error adding sub-territory:', error);
    throw error;
  }
};

export const getSubTerritories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetSubTerritories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sub-territories:', error);
    throw error;
  }
};
