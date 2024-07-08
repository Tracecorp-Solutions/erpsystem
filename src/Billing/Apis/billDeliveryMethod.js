import axios from 'axios';

// Define the base URL for the API using environment variable
const BASE_URL = process.env.REACT_APP_API_URL;

if (!BASE_URL) {
  console.error('REACT_APP_API_URL is not defined');
}

// Function to add a bill delivery method
export const addBillDeliveryMethod = async (method) => {
  try {
    const response = await axios.post(`${BASE_URL}/AddBillDeliveryMethod`, method);
    return response.data;
  } catch (error) {
    console.error('Error adding bill delivery method:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get bill delivery methods
export const getBillDeliveryMethods = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/GetBillDeliveryMethods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bill delivery methods:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// For debugging purposes
console.log('Base URL:', BASE_URL);
