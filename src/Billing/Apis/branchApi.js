import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const addBranch = async (branch) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddBranch`, branch);
    return response.data;
  } catch (error) {
    console.error('Error adding branch:', error);
    throw error;
  }
};

export const getBranches = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetBranches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw error;
  }
};
