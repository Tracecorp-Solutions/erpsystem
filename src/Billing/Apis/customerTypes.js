// customerCategoryApi.js

import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'http://3.216.182.63:8095/TestApi';

// Function to add a customer category
export const addCustomerType = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddCustomerType`, category);
    return response.data;
  } catch (error) {
    console.error('Error adding customer type:', error);
    throw error;
  }
};

// Function to get customer categories
export const getCustomerTypes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetCustomerTypes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customer types:', error);
    throw error;
  }
};
