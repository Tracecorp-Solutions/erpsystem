import axios from 'axios';

const BASE_URL = 'http://3.216.182.63:8095/TestApi';

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