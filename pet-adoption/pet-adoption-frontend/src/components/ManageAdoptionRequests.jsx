import axios from 'axios';

export const getAllAdoptionRequests = async () => {
  const res = await axios.get('/admin/adoption-requests');
  return res.data;
};

export const updateAdoptionRequestStatus = async (id, status) => {
  await axios.patch(`/admin/adoption-requests/${id}`, { status });
};

const ManageAdoptionRequests = {
    getAllAdoptionRequests,
    updateAdoptionRequestStatus
  };
  
  export default ManageAdoptionRequests;
