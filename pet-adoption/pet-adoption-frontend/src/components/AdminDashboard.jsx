import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [pets, setPets] = useState([]);
  const [newPet, setNewPet] = useState({ name: '', age: '', breed: '', location: '', description: '', image: '' });

  // Fetch all pets for the admin dashboard
  useEffect(() => {
    const fetchPets = async () => {
      const response = await axios.get('/api/pets');
      setPets(response.data);
    };
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/pets/${id}`);
      setPets(pets.filter(pet => pet._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete pet');
    }
  };

  const handleAddPet = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/pets', newPet);
      setPets([...pets, response.data]);
      setNewPet({ name: '', age: '', breed: '', location: '', description: '', image: '' });
      alert('Pet added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add pet');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <form onSubmit={handleAddPet} className="my-6">
        <input type="text" placeholder="Pet Name" onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} required />
        <input type="number" placeholder="Age" onChange={(e) => setNewPet({ ...newPet, age: e.target.value })} required />
        <input type="text" placeholder="Breed" onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })} required />
        <input type="text" placeholder="Location" onChange={(e) => setNewPet({ ...newPet, location: e.target.value })} required />
        <textarea placeholder="Description" onChange={(e) => setNewPet({ ...newPet, description: e.target.value })} required />
        <input type="text" placeholder="Image URL" onChange={(e) => setNewPet({ ...newPet, image: e.target.value })} required />
        <button type="submit" className="btn btn-primary mt-4">Add Pet</button>
      </form>

      <h2 className="text-2xl font-bold mt-6">Manage Pets</h2>
      <ul className="list-disc pl-5">
        {pets.map((pet) => (
          <li key={pet._id} className="my-4">
            <h3>{pet.name} ({pet.breed})</h3>
            <button onClick={() => handleDelete(pet._id)} className="btn btn-error">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
