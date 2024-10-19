import axios from 'axios';

export const getAllUsers = async () => {
  const res = await axios.get('/admin/users');
  return res.data;
};
