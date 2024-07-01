import axios from 'axios';

const BASE_URL = 'http://localhost:5102';

export const getApplications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetApplications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const getApplicationById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/GetApplications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching application by ID:', error);
    throw error;
  }
};
