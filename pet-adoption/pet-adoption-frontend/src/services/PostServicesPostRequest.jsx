import axios from 'axios';

const API_URL_ADOPTION = 'http://localhost:5000/api/adoption-requests';

export const createRequest = async (requestData) => {
  try {
    const response = await axios.post(API_URL_ADOPTION, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating adoption request:', error);
    throw error;
  }
};
