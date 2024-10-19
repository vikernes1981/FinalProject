import React, { useState, useEffect } from 'react';
import { getAllPets, addPet, updatePet, deletePet } from '../services/PostServicesPets';

const ManagePets = () => {
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({ name: '', age: '', breed: '', type: '', description: '', image: '' });

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        const res = await getAllPets();
        if (Array.isArray(res)) {
            setPets(res);
        } else {
            setPets([]);
            console.error('Expected an array but got:', res);
        }
    };

    const handleAddPet = async () => {
        try {
            console.log('Adding pet:', newPet);
            await addPet(newPet);
            setNewPet({ name: '', age: '', breed: '', type: '', description: '', image: '' }); // Reset the form
            fetchPets();
        } catch (error) {
            console.error('Error adding pet:', error);
        }
    };

    const handleUpdatePet = async (id, updatedPet) => {
        await updatePet(id, updatedPet);
        fetchPets();
    };

    const handleDeletePet = async (id) => {
        await deletePet(id);
        fetchPets();
    };

    return (
        <div className="manage-pets">
            <h2 className="text-xl font-semibold mb-4">Manage Pets</h2>
            <div className="add-pet-form mb-8">
                <input type="text" placeholder="Pet Name" value={newPet.name} onChange={e => setNewPet({ ...newPet, name: e.target.value })} />
                <input type="number" placeholder="Age" value={newPet.age} onChange={e => setNewPet({ ...newPet, age: e.target.value })} />
                <input type="text" placeholder="Breed" value={newPet.breed} onChange={e => setNewPet({ ...newPet, breed: e.target.value })} />
                <input type="text" placeholder="Type" value={newPet.type} onChange={e => setNewPet({ ...newPet, type: e.target.value })} />
                <input type="text" placeholder="Description" value={newPet.description} onChange={e => setNewPet({ ...newPet, description: e.target.value })} />
                <input type="text" placeholder="Image URL" value={newPet.image} onChange={e => setNewPet({ ...newPet, image: e.target.value })} />
                <button onClick={handleAddPet}>Add Pet</button>
            </div>

            <ul>
                {Array.isArray(pets) && pets.map(pet => (
                    <li key={pet._id}>
                        {pet.name} ({pet.breed})
                        <button onClick={() => handleUpdatePet(pet._id, { ...pet, name: 'Updated Name' })}>Edit</button>
                        <button onClick={() => handleDeletePet(pet._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagePets;
