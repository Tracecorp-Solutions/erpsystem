// customerCategoryApi.js

import axios from 'axios';

// Define the base URL for the API
const BASE_URL = 'http://localhost:5102';

// Function to add a customer category
export const addBillDeliveryMethod = async (category) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddBillDeliveryMethod`, category);
    return response.data;
  } catch (error) {
    console.error('Error adding in bill delivery:', error);
    throw error;
  }
};

// Function to get customer categories
export const getBillDeliveryMethods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetBillDeliveryMethods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bill delivery:', error);
    throw error;
  }
};
