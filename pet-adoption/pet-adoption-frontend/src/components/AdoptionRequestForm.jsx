import React, { useState } from 'react';
import axios from 'axios';

const AdoptionRequestForm = ({ petId }) => {
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/adoption-request/${petId}`, { message });
      alert('Request submitted');
    } catch (err) {
      alert('Error submitting request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Why do you want to adopt this pet?" required />
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default AdoptionRequestForm;
