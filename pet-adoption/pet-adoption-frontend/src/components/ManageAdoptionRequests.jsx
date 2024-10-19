import React, { useState, useEffect } from "react";
import Select from "react-select";
import { getAllRequest as getAllAdoptionRequests, updateRequest as updateAdoptionRequestStatus } from "../services/PostServicesAdoption";

const ManageAdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null); // Set default to null

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await getAllAdoptionRequests();
    if (Array.isArray(res)) {
      setRequests(res);
    } else {
      setRequests([]);
      console.error("Expected an array but got:", res);
    }
  };

  const handleUpdateStatus = async () => {
    if (selectedRequest && selectedStatus) {
      try {
        await updateAdoptionRequestStatus(selectedRequest._id, { status: selectedStatus.value });
        fetchRequests(); // Refresh the requests list after update
        setSelectedRequest(null); // Reset the selected request
        setSelectedStatus(null); // Reset the selected status
      } catch (error) {
        console.error("Error updating request status:", error);
      }
    }
  };

  const requestOptions = requests.map((request) => ({
    value: request._id,
    label: `${request.pet.name} - ${request.status}`,
    request: request,
  }));

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#333',
      color: '#fff',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#333',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#555' : '#333',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#444',
      },
    }),
  };

  return (
    <div className="manage-requests p-4">
      <h2 className="text-2xl font-semibold mb-6">Manage Adoption Requests</h2>
      <Select
        options={requestOptions}
        onChange={(selectedOption) => setSelectedRequest(selectedOption.request)}
        placeholder="Select a request..."
        className="mb-6"
        styles={customStyles}
        value={selectedRequest ? { value: selectedRequest._id, label: `${selectedRequest.pet.name} - ${selectedRequest.status}` } : null} // Set selected value
      />

      {selectedRequest && (
        <div className="update-request-form p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Update Request Status</h3>
          <p><strong>User:</strong> {selectedRequest.user.username}</p>
          <p><strong>Pet Name:</strong> {selectedRequest.pet.name}</p>
          <p><strong>Message:</strong> {selectedRequest.message}</p>
          <p><strong>Status:</strong> {selectedRequest.status}</p>

          <Select
            options={statusOptions}
            onChange={(selectedOption) => setSelectedStatus(selectedOption)}
            placeholder="Select a status..."
            className="mb-4"
            styles={customStyles}
            value={selectedStatus} // Set selected status value
          />
          <button
            onClick={handleUpdateStatus}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageAdoptionRequests;
