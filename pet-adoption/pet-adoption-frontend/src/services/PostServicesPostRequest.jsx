import axios from 'axios';

const API_URL_ADOPTION = 'https://finalproject-taeu.onrender.com/api/adoption-requests';

export const createRequest = async (data) => {
  try {
    const response = await axios.post(API_URL_ADOPTION, data);
    return response.data;
  } catch (error) {
    console.error('Error creating adoption request: ', error.response || error.message);
    throw error;
  }
};